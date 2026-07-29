"use client";

import { useEffect, useState } from "react";

type Order = {
  _id: string;
  templateName: string;
  customerName: string;
  status: string;
  paymentStatus: string;
  completedThumbnail: string;
  createdAt: string;
};

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const res = await fetch("/api/my-orders");
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

    void loadOrders();
  }, []);

  if (loading) {
    return (
      <div className="text-white text-center py-10">
        Loading Orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-gray-400 text-center py-10">
        No Orders Yet
      </div>
    );
  }

  return (
    <div className="space-y-6">{orders.map((order) => (
  <div
    key={order._id}
    className="bg-zinc-900 border border-cyan-500 rounded-2xl p-6"
  >
    <div className="grid md:grid-cols-2 gap-8">

      <div>

        <h2 className="text-2xl font-bold text-white">
          {order.templateName}
        </h2>

        <p className="text-gray-400 mt-2">
          Customer : {order.customerName}
        </p>

        <p className="mt-3">
          Status :
          <span
            className={`ml-2 font-bold ${
              order.status === "Completed"
                ? "text-green-400"
                : "text-yellow-400"
            }`}
          >
            {order.status}
          </span>
        </p>

        <p className="mt-2">
          Payment :
          <span className="ml-2 text-cyan-400">
            {order.paymentStatus}
          </span>
        </p>

        <p className="text-gray-500 mt-4">
          {new Date(order.createdAt).toLocaleString()}
        </p>

      </div>

      <div>

        {order.completedThumbnail ? (
          <>
            <img
              src={order.completedThumbnail}
              alt="Completed Thumbnail"
              className="rounded-xl border border-cyan-500 w-full h-64 object-cover"
            />

            <button
  onClick={async () => {
    try {
      const res = await fetch(`/api/download/${order._id}`);

      const data = await res.json();

      if (!data.success) {
        alert(data.message);
        return;
      }

      window.open(data.downloadUrl, "_blank");
    } catch (error) {
      console.error(error);
      alert("Download Failed");
    }
  }}
  className="w-full mt-5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl"
>
  📥 Download Thumbnail
</button>
          </>
        ) : (
          <div className="h-64 rounded-xl bg-zinc-800 flex justify-center items-center text-gray-400">
            Thumbnail is being created...
          </div>
        )}

      </div>

    </div>
  </div>
        ))}
      </div>
  );
}
