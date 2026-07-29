"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Order = {
  _id: string;
  customerName: string;
  templateName: string;
  price: number;
  status: string;
  paymentStatus: string;
  customerImage: string;
  createdAt: string;
};

export default function AdminOrdersPage() {
  const router = useRouter();
const [uploading, setUploading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
   const completeOrder = async (
  orderId: string,
  file: File
) => {
  try {
    setUploading(true);

    // Upload Thumbnail
    const formData = new FormData();
    formData.append("file", file);

    const uploadRes = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const uploadJson = await uploadRes.json();

    if (!uploadJson.success) {
      alert("Upload Failed");
      setUploading(false);
      return;
    }

    // Update Order
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        completedThumbnail: uploadJson.image,
        adminNote: "Completed Successfully",
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Order Completed ✅");

      router.refresh();
    } else {
      alert(data.message);
    }

    setUploading(false);
  } catch (error) {
    console.error(error);
    setUploading(false);
  }
};

  const loadOrders = async () => {
      try {
        const res = await fetch("/api/admin/orders");

        const data = await res.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      void loadOrders();
    }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-white text-2xl">
        Loading Orders...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white py-10">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-cyan-400 mb-10">
          All Orders
        </h1>

        <div className="grid gap-6">

          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-zinc-900 rounded-2xl border border-cyan-500 p-6"
            >

              <div className="grid md:grid-cols-2 gap-8">

                <div>

                  <h2 className="text-2xl font-bold">
                    {order.customerName}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    {order.templateName}
                  </p>

                  <p className="mt-3">
                    💰 ₹{order.price}
                  </p>

                  <p className="mt-2">
                    Payment :
                    <span className="text-green-400 ml-2">
                      {order.paymentStatus}
                    </span>
                  </p>

                  <p className="mt-2">
                    Status :
                    <span className="text-yellow-400 ml-2">
                      {order.status}
                    </span>
                  </p>

                  <p className="text-gray-500 mt-3">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>

                </div>

                <div>

  {order.customerImage ? (
    <img
      src={order.customerImage}
      alt="Customer"
      className="rounded-xl border border-cyan-500 w-full h-72 object-cover"
    />
  ) : (
    <div className="h-72 flex justify-center items-center bg-zinc-800 rounded-xl">
      No Image
    </div>
  )}

  <div className="mt-6">
    <input
      type="file"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        void completeOrder(order._id, file);
      }}
      disabled={uploading}
      className="w-full"
    />
  </div>

</div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}