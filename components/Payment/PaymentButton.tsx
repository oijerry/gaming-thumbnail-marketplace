"use client";

console.log("COUPON VERSION");

import { useState } from "react";

type Props = {
  templateId: string;
  amount: number;
  templateName: string;
  customerName: string;
  customerImage: string;
};

type RazorpayResponse = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

type RazorpayOptions = {
  key?: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void | Promise<void>;
  prefill: { name: string };
  theme: { color: string };
  modal: { ondismiss: () => void };
};

type RazorpayInstance = {
  open: () => void;
  on: (event: string, callback: () => void) => void;
};

type RazorpayConstructor = new (options: RazorpayOptions) => RazorpayInstance;

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

export default function PaymentButton({
  templateId,
  amount,
  templateName,
  customerName,
  customerImage,
}: Props) {
  const customerEmail = "";

  const [loading, setLoading] = useState(false);

  const [couponCode, setCouponCode] = useState("");
const [discount, setDiscount] = useState(0);
const [finalAmount, setFinalAmount] = useState(amount);
const [couponLoading, setCouponLoading] = useState(false);

const applyCoupon = async () => {
  if (!couponCode.trim()) {
    alert("Enter Coupon Code");
    return;
  }

  try {
    setCouponLoading(true);

    const res = await fetch("/api/coupon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: couponCode,
        amount,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setDiscount(data.discount);
      setFinalAmount(data.finalAmount);
      alert("Coupon Applied ✅");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Coupon Error");
  } finally {
    setCouponLoading(false);
  }
};

  const handlePayment = async () => {
    if (!customerName.trim()) {
      alert("Please enter your name.");
      return;
    }

    setLoading(true);

    try {
      const orderRes = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId,
          templateName,
          customerName,
          customerEmail,
price: finalAmount,        }),
      });

      const orderJson = await orderRes.json();

      if (!orderJson.success) {
        alert(orderJson.message);
        setLoading(false);
        return;
      }

      const mongoOrderId = orderJson.order._id;

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
amount: finalAmount,        }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("Failed to create payment order.");
        setLoading(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: "INR",
        name: "Gaming Thumbnail Marketplace",
        description: templateName,
        order_id: data.order.id,
        handler: async function (response: RazorpayResponse) {
          if (
            !response.razorpay_order_id ||
            !response.razorpay_payment_id ||
            !response.razorpay_signature
          ) {
            alert("Invalid payment response");
            setLoading(false);
            return;
          }

          const verifyRes = await fetch("/api/payment/verify", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderId: mongoOrderId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyJson = await verifyRes.json();

          if (verifyJson.success) {
            alert("Payment Successful ✅");
            window.location.href = "/dashboard";
          } else {
            alert("Payment Verification Failed");
          }

          setLoading(false);
        },
        prefill: {
          name: customerName,
        },
        theme: {
          color: "#06b6d4",
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();

      paymentObject.on("payment.failed", function () {
        alert("Payment Failed ❌");
        setLoading(false);
      });
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
  <div className="mt-8 space-y-5">

    <div className="rounded-2xl border border-cyan-500 bg-zinc-900 p-5">

      <label className="block mb-3 text-sm text-gray-300">
        Coupon Code
      </label>

      <div className="flex gap-3">

        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter Coupon"
          className="flex-1 rounded-xl bg-zinc-800 border border-zinc-700 px-4 py-3 text-white outline-none focus:border-cyan-500"
        />

        <button
          type="button"
          onClick={applyCoupon}
          disabled={couponLoading}
          className="px-6 rounded-xl bg-yellow-500 text-black font-bold hover:bg-yellow-400"
        >
          {couponLoading ? "Checking..." : "Apply"}
        </button>

      </div>

      {discount > 0 && (

        <div className="mt-4 rounded-xl bg-green-500/20 border border-green-500 p-4">

          <p className="text-green-400 font-bold">
            Coupon Applied Successfully ✅
          </p>

          <p className="text-gray-300 mt-2">
            Discount : ₹{discount}
          </p>

          <p className="text-xl font-bold text-cyan-400 mt-2">
            Final Price : ₹{finalAmount}
          </p>

        </div>

      )}

    </div>

    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xl font-bold hover:scale-105 transition disabled:opacity-50"
    >
      {loading ? "Processing..." : `Pay ₹${finalAmount}`}
    </button>

  </div>
);
}