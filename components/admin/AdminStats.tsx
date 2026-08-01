"use client";

import { useEffect, useState } from "react";

type Stats = {
  totalOrders: number;
  totalUsers: number;
  totalTemplates: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
};

export default function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch("/api/admin/dashboard");
        const data = await res.json();

        if (data.success) {
          setStats(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    void loadStats();
  }, []);

  if (!stats) {
    return (
      <div className="flex items-center justify-center py-20 text-white text-2xl font-bold">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

      <div className="bg-zinc-900 border border-cyan-500 rounded-2xl p-6 hover:scale-105 transition">
        <p className="text-gray-400 text-lg">📦 Total Orders</p>
        <h2 className="text-5xl font-bold text-cyan-400 mt-4">
          {stats.totalOrders}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-green-500 rounded-2xl p-6 hover:scale-105 transition">
        <p className="text-gray-400 text-lg">💰 Total Revenue</p>
        <h2 className="text-5xl font-bold text-green-400 mt-4">
          ₹{stats.totalRevenue}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-blue-500 rounded-2xl p-6 hover:scale-105 transition">
        <p className="text-gray-400 text-lg">👥 Total Users</p>
        <h2 className="text-5xl font-bold text-blue-400 mt-4">
          {stats.totalUsers}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-purple-500 rounded-2xl p-6 hover:scale-105 transition">
        <p className="text-gray-400 text-lg">🎮 Templates</p>
        <h2 className="text-5xl font-bold text-purple-400 mt-4">
          {stats.totalTemplates}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-yellow-500 rounded-2xl p-6 hover:scale-105 transition">
        <p className="text-gray-400 text-lg">⏳ Pending Orders</p>
        <h2 className="text-5xl font-bold text-yellow-400 mt-4">
          {stats.pendingOrders}
        </h2>
      </div>

      <div className="bg-zinc-900 border border-emerald-500 rounded-2xl p-6 hover:scale-105 transition">
        <p className="text-gray-400 text-lg">✅ Completed Orders</p>
        <h2 className="text-5xl font-bold text-emerald-400 mt-4">
          {stats.completedOrders}
        </h2>
      </div>

    </div>
  );
}