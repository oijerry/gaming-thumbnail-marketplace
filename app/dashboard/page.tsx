"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MyOrders from "@/components/dashboard/MyOrders";

type User = {
  name: string;
  email: string;
  role: string;
};

type Order = {
  _id: string;
  templateName: string;
  price: number;
  status: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Get Logged In User
        const userRes = await fetch("/api/auth/me");
        const userData = await userRes.json();

        if (!userData.success) {
          router.push("/login");
          return;
        }

        setUser(userData.user);

        // Get User Orders
        const orderRes = await fetch("/api/orders/my");
        const orderData = await orderRes.json();

        if (orderData.success) {
          setOrders(orderData.orders);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [router]);

  const logout = async () => {
    await fetch("/api/auth/logout");
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-3xl">
        Loading...
      </div>
    );
  }

  if (!user) return null;

  const totalOrders = orders.length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const totalSpent = orders.reduce(
    (sum, order) => sum + order.price,
    0
  );

  return (
    <div className="min-h-screen bg-black text-white py-14 px-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-5xl font-bold text-cyan-400">
              Welcome, {user.name} 👋
            </h1>

            <p className="text-gray-400 mt-3 text-lg">
              {user.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-400 px-6 py-3 rounded-xl font-bold"
          >
            Logout
          </button>
        </div>

        <MyOrders />

        {/* Dashboard Cards */}

        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-zinc-900 border border-cyan-500 rounded-2xl p-8">
            <p className="text-gray-400">Total Orders</p>

            <h2 className="text-5xl font-bold mt-4 text-cyan-400">
              {totalOrders}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-green-500 rounded-2xl p-8">
            <p className="text-gray-400">Completed</p>

            <h2 className="text-5xl font-bold mt-4 text-green-400">
              {completedOrders}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-yellow-500 rounded-2xl p-8">
            <p className="text-gray-400">Pending</p>

            <h2 className="text-5xl font-bold mt-4 text-yellow-400">
              {pendingOrders}
            </h2>
          </div>

          <div className="bg-zinc-900 border border-pink-500 rounded-2xl p-8">
            <p className="text-gray-400">Total Spent</p>

            <h2 className="text-5xl font-bold mt-4 text-pink-400">
              ₹{totalSpent}
            </h2>
          </div>

        </div>

        {/* Orders Table */}

        <div className="mt-14">

          <h2 className="text-3xl font-bold mb-6">
            My Orders
          </h2>

          <div className="overflow-x-auto rounded-2xl border border-zinc-700">

            <table className="w-full">

              <thead className="bg-zinc-900">

                <tr>
                  <th className="text-left p-5">Template</th>
                  <th className="text-left p-5">Price</th>
                  <th className="text-left p-5">Status</th>
                </tr>

              </thead>

              <tbody>

                {orders.length === 0 ? (

                  <tr>

                    <td
                      colSpan={3}
                      className="text-center p-8 text-gray-400"
                    >
                      No Orders Yet
                    </td>

                  </tr>

                ) : (

                  orders.map((order) => (

                    <tr
                      key={order._id}
                      className="border-t border-zinc-800"
                    >

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

                  ))

                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}