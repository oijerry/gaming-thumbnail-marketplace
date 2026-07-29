"use client";

import { useEffect, useState } from "react";

type DashboardData = {
  totalUsers: number;
  totalOrders: number;
  totalTemplates: number;
  totalRevenue: number;
  recentOrders: {
    _id: string;
    customerName: string;
    templateName: string;
    price: number;
    status: string;
  }[];
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await fetch("/api/admin/dashboard");
      const json = await res.json();

      if (json.success) {
        setData(json);
      }
    };

    fetchDashboard();
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-white text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-bold text-cyan-400 mb-10">
          Admin Dashboard
        </h1>

        <div className="grid lg:grid-cols-4 gap-6">

          <div className="bg-zinc-900 rounded-2xl border border-cyan-500 p-8">
            <p>Total Users</p>
            <h2 className="text-5xl font-bold mt-4">
              {data.totalUsers}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-green-500 p-8">
            <p>Total Orders</p>
            <h2 className="text-5xl font-bold mt-4">
              {data.totalOrders}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-pink-500 p-8">
            <p>Total Revenue</p>
            <h2 className="text-5xl font-bold mt-4">
              ₹{data.totalRevenue}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-2xl border border-yellow-500 p-8">
            <p>Total Templates</p>
            <h2 className="text-5xl font-bold mt-4">
              {data.totalTemplates}
            </h2>
          </div>

        </div>

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-6">
            Recent Orders
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-zinc-700">

            <table className="w-full">

              <thead className="bg-zinc-900">

                <tr>
                  <th className="text-left p-5">Customer</th>
                  <th className="text-left p-5">Template</th>
                  <th className="text-left p-5">Price</th>
                  <th className="text-left p-5">Status</th>
                </tr>

              </thead>

              <tbody>

                {data.recentOrders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-t border-zinc-800"
                  >

                    <td className="p-5">
                      {order.customerName}
                    </td>

                    <td className="p-5">
                      {order.templateName}
                    </td>

                    <td className="p-5">
                      ₹{order.price}
                    </td>

                    <td className="p-5">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${
                          order.status === "Completed"
                            ? "bg-green-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {order.status}
                      </span>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  );
}