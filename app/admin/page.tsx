"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminStats from "@/components/admin/AdminStats";


type Order = {
  _id: string;
  customerName: string;
  templateName: string;
  price: number;
  status: string;
};

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();
  

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/orders/all");
      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("adminLoggedIn");

    if (isLoggedIn !== "true") {
      router.push("/admin/login");
      return;
    }

    const loadOrders = async () => {
      try {
        const res = await fetch("/api/orders/all");
        const data = await res.json();
        if (data.success) setOrders(data.orders);
      } catch (error) {
        console.error(error);
      }
    };

    void loadOrders();
  }, [router]);

  const markCompleted = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/update/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: "Completed",
        }),
      });

      const data = await res.json();

      if (data.success) {
        fetchOrders();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteOrder = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/orders/delete/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("Order Deleted Successfully ✅");
        fetchOrders();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-6xl mx-auto">

        <div className="flex justify-between items-center mb-10">
  <h1 className="text-5xl font-bold text-cyan-400">
    Orders Dashboard
  </h1>

  <div className="flex gap-4">

    <button
      onClick={() => router.push("/admin/templates/new")}
      className="bg-cyan-500 hover:bg-cyan-400 text-black px-5 py-2 rounded-lg font-bold"
    >
      ➕ Add Template
    </button>

    <button
  onClick={() => router.push("/admin/templates")}
  className="bg-blue-500 hover:bg-blue-400 text-white px-5 py-2 rounded-lg font-bold"
>

  <AdminStats />
  📦 Manage Templates
</button>


    <button
      onClick={() => {
        localStorage.removeItem("adminLoggedIn");
        router.push("/admin/login");
      }}
      className="bg-red-500 hover:bg-red-400 px-5 py-2 rounded-lg font-bold"
    >
      Logout
    </button>

  </div>
</div>


        
        {orders.length === 0 ? (
          <p className="text-center text-gray-400 text-xl">
            No Orders Found
          </p>
        ) : (
          <div className="space-y-6">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-zinc-900 border border-cyan-500 rounded-xl p-6"
              >
                <h2 className="text-2xl font-bold">
                  👤 {order.customerName}
                </h2>

                <p className="mt-2">
                  🎮 <span className="font-semibold">Template:</span>{" "}
                  {order.templateName}
                </p>

                <p className="mt-2">
                  💰 <span className="font-semibold">Price:</span> ₹
                  {order.price}
                </p>

                <p className="mt-2">
                  📦 <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={
                      order.status === "Completed"
                        ? "text-green-400 font-bold"
                        : "text-yellow-400 font-bold"
                    }
                  >
                    {order.status}
                  </span>
                </p>

                <div className="flex gap-4 mt-6">

                  {order.status === "Pending" && (
                    <button
                      onClick={() => markCompleted(order._id)}
                      className="bg-green-500 hover:bg-green-400 text-black px-6 py-2 rounded-lg font-bold"
                    >
                      ✔ Mark Completed
                    </button>
                  )}

                  <button
                    onClick={() => deleteOrder(order._id)}
                    className="bg-red-500 hover:bg-red-400 text-white px-6 py-2 rounded-lg font-bold"
                  >
                    🗑 Delete Order
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
}