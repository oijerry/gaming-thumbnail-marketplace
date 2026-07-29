"use client";

import { useEffect, useState } from "react";

type Stats = {
  totalOrders: number;
  totalUsers: number;
  totalTemplates: number;
  pendingOrders: number;
  completedOrders: number;
  revenue: number;
};

export default function AdminStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch("/api/admin/stats");
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
      <div className="text-white text-center py-10">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6"><div className="bg-zinc-900 rounded-2xl border border-cyan-500 p-6">
  <h2 className="text-gray-400">📦 Total Orders</h2>
  <p className="text-4xl font-bold text-cyan-400 mt-3">
    {stats.totalOrders}
  </p>
</div>

<div className="bg-zinc-900 rounded-2xl border border-cyan-500 p-6">
  <h2 className="text-gray-400">💰 Revenue</h2>
  <p className="text-4xl font-bold text-green-400 mt-3">
    ₹{stats.revenue}
  </p>
</div>

<div className="bg-zinc-900 rounded-2xl border border-cyan-500 p-6">
  <h2 className="text-gray-400">👥 Users</h2>
  <p className="text-4xl font-bold text-blue-400 mt-3">
    {stats.totalUsers}
  </p>
</div>

<div className="bg-zinc-900 rounded-2xl border border-cyan-500 p-6">
  <h2 className="text-gray-400">🎮 Templates</h2>
  <p className="text-4xl font-bold text-purple-400 mt-3">
    {stats.totalTemplates}
  </p>
</div>

<div className="bg-zinc-900 rounded-2xl border border-cyan-500 p-6">
  <h2 className="text-gray-400">⏳ Pending</h2>
  <p className="text-4xl font-bold text-yellow-400 mt-3">
    {stats.pendingOrders}
  </p>
</div>

<div className="bg-zinc-900 rounded-2xl border border-cyan-500 p-6">
  <h2 className="text-gray-400">✅ Completed</h2>
  <p className="text-4xl font-bold text-green-500 mt-3">
    {stats.completedOrders}
  </p>
</div>
    </div>
  );
}