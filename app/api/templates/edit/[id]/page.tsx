"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTemplatePage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    image: "",
    category: "",
    description: "",
    badge: "",
    price: "",
    rating: "",
    downloads: "",
  });

  const fetchTemplate = useCallback(async () => {
    try {
      const res = await fetch(`/api/templates/${id}`);
      const data = await res.json();

      if (data.success) {
        setForm({
          title: data.template.title,
          image: data.template.image,
          category: data.template.category,
          description: data.template.description,
          badge: data.template.badge,
          price: String(data.template.price),
          rating: String(data.template.rating),
          downloads: String(data.template.downloads),
        });
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load template.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchTemplate();
    }, 0);
    return () => window.clearTimeout(timer);
  }, [fetchTemplate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white text-3xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white py-10">

      <div className="max-w-3xl mx-auto bg-zinc-900 p-8 rounded-2xl">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          Edit Template
        </h1>

        <img
          src={form.image}
          alt="Template"
          className="w-full rounded-xl mb-6"
        />

        <div className="space-y-5">

          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full p-4 rounded-lg bg-zinc-800"
          />

          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-4 rounded-lg bg-zinc-800"
          />

          <input
            name="badge"
            value={form.badge}
            onChange={handleChange}
            placeholder="Badge"
            className="w-full p-4 rounded-lg bg-zinc-800"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            type="number"
            className="w-full p-4 rounded-lg bg-zinc-800"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-4 rounded-lg bg-zinc-800 h-32"
          />

          <button
            className="w-full py-4 rounded-xl bg-cyan-500 text-black font-bold"
          >
            Save Changes
          </button>

          <button
            onClick={() => router.push("/admin/templates")}
            className="w-full py-4 rounded-xl bg-red-500 text-white font-bold"
          >
            Cancel
          </button>

        </div>

      </div>

    </div>
  );
}