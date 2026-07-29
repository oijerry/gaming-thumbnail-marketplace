"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Template = {
  _id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  badge: string;
};

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const res = await fetch("/api/templates");
        const data = await res.json();

        if (data.success) {
          setTemplates(data.templates);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void loadTemplates();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading Templates...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white py-10">
      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-5xl font-bold text-cyan-400 mb-10">
          Manage Templates
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
  <div
    key={template._id}
    className="bg-zinc-900 border border-cyan-500 rounded-2xl overflow-hidden"
  >
    <img
      src={template.image}
      alt={template.title}
      className="w-full h-56 object-cover"
    />

    <div className="p-5">

      <span className="bg-cyan-500 text-black px-3 py-1 rounded-full text-sm">
        {template.badge}
      </span>

      <h2 className="text-2xl font-bold mt-4">
        {template.title}
      </h2>

      <p className="text-gray-400 mt-2">
        {template.category}
      </p>

      <p className="text-cyan-400 text-2xl font-bold mt-4">
        ₹{template.price}
      </p>

      <div className="flex gap-3 mt-6">

        <Link
          href={`/admin/templates/${template._id}`}
          className="flex-1"
        >
          <button className="w-full bg-yellow-500 hover:bg-yellow-400 text-black py-3 rounded-xl font-bold">
            ✏ Edit
          </button>
        </Link>

        <button
          onClick={async () => {
            const ok = confirm(
              "Delete this template?"
            );

            if (!ok) return;

            const res = await fetch(
              `/api/templates/${template._id}`,
              {
                method: "DELETE",
              }
            );

            const data = await res.json();

            if (data.success) {
              alert("Deleted Successfully");

              setTemplates((prev) =>
                prev.filter(
                  (item) =>
                    item._id !== template._id
                )
              );
            } else {
              alert(data.message);
            }
          }}
          className="flex-1 bg-red-500 hover:bg-red-400 py-3 rounded-xl font-bold"
        >
          🗑 Delete
        </button>

      </div>

    </div>
  </div>
))}

        </div>

      </div>

    </div>
  );
}