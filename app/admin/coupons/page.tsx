"use client";

import { useEffect, useState } from "react";

type Coupon = {
  _id: string;
  code: string;
  discount: number;
  active: boolean;
  expiresAt: string;
};

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const loadCoupons = async () => {
    const res = await fetch("/api/admin/coupons");
    const data = await res.json();

    if (data.success) {
      setCoupons(data.coupons);
    }
  };

  useEffect(() => {
    void loadCoupons();
  }, []);

  const createCoupon = async () => {
    const res = await fetch("/api/admin/coupons", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code,
        discount: Number(discount),
        expiresAt,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Coupon Created ✅");
      setCode("");
      setDiscount("");
      setExpiresAt("");
      void loadCoupons();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-10">

      <h1 className="text-5xl font-bold text-cyan-400 mb-10">
        Coupon Management
      </h1>

      <div className="bg-zinc-900 p-6 rounded-2xl border border-cyan-500">

        <input
          placeholder="Coupon Code"
          className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <input
          placeholder="Discount %"
          type="number"
          className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />

        <input
          type="date"
          className="w-full p-4 rounded-xl bg-zinc-800 mb-4"
          value={expiresAt}
          onChange={(e) => setExpiresAt(e.target.value)}
        />

        <button
          onClick={createCoupon}
          className="w-full py-4 rounded-xl bg-cyan-500 text-black font-bold"
        >
          Create Coupon
        </button>

      </div>

      <div className="mt-10 space-y-4">

        {coupons.map((coupon) => (
          <div
            key={coupon._id}
            className="bg-zinc-900 border border-cyan-500 rounded-xl p-5 flex justify-between items-center"
          >
            <div>
              <h2 className="text-2xl font-bold">{coupon.code}</h2>

              <p>{coupon.discount}% OFF</p>

              <p>
                Expires :
                {" "}
                {new Date(coupon.expiresAt).toLocaleDateString()}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-xl ${
                coupon.active
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {coupon.active ? "Active" : "Inactive"}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}