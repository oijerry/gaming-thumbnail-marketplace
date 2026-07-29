"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditTemplatePage() {
  const { id } = useParams();

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    badge: "",
    description: "",
    image: "",
    price: "",
    rating: "",
    downloads: "",
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      try {
        const res = await fetch(`/api/templates/${id}`);

        const data = await res.json();

        if (data.success) {
          const t = data.template;

          setForm({
            title: t.title,
            category: t.category,
            badge: t.badge,
            description: t.description,
            image: t.image,
            price: String(t.price),
            rating: String(t.rating),
            downloads: String(t.downloads),
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    void loadTemplate();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white py-10">

      <div className="max-w-3xl mx-auto bg-zinc-900 rounded-3xl p-8">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8">
          Edit Template
        </h1>

        <img
  src={form.image}
  alt="Template"
  className="w-full h-72 object-cover rounded-2xl border border-cyan-500 mb-8"
/>

<div className="mt-6">
  <label className="block mb-2 text-cyan-400 font-bold">
    Change Thumbnail
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files?.[0]) {
        setSelectedImage(e.target.files[0]);
      }
    }}
    className="w-full p-4 rounded-xl bg-zinc-800"
  />
</div>

<div className="space-y-5">

  <input
    name="title"
    value={form.title}
    onChange={handleChange}
    placeholder="Title"
    className="w-full p-4 rounded-xl bg-zinc-800"
  />

  <input
    name="category"
    value={form.category}
    onChange={handleChange}
    placeholder="Category"
    className="w-full p-4 rounded-xl bg-zinc-800"
  />

  <input
    name="badge"
    value={form.badge}
    onChange={handleChange}
    placeholder="Badge"
    className="w-full p-4 rounded-xl bg-zinc-800"
  />

  <input
    type="number"
    name="price"
    value={form.price}
    onChange={handleChange}
    placeholder="Price"
    className="w-full p-4 rounded-xl bg-zinc-800"
  />

  <input
    type="number"
    name="rating"
    value={form.rating}
    onChange={handleChange}
    placeholder="Rating"
    className="w-full p-4 rounded-xl bg-zinc-800"
  />

  <input
    type="number"
    name="downloads"
    value={form.downloads}
    onChange={handleChange}
    placeholder="Downloads"
    className="w-full p-4 rounded-xl bg-zinc-800"
  />

  <textarea
    name="description"
    value={form.description}
    onChange={handleChange}
    placeholder="Description"
    className="w-full p-4 rounded-xl bg-zinc-800 h-40"
  />

  <button
    onClick={async () => {
      try {
        setSaving(true);

        let imageUrl = form.image;

if (selectedImage) {
  const imageData = new FormData();
  imageData.append("file", selectedImage);

  const uploadRes = await fetch("/api/upload", {
    method: "POST",
    body: imageData,
  });

  const uploadJson = await uploadRes.json();

  if (!uploadJson.success) {
    alert("Image Upload Failed");
    setSaving(false);
    return;
  }

  imageUrl = uploadJson.image;
}

        const res = await fetch(`/api/templates/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...form,

image: imageUrl,
            price: Number(form.price),
            rating: Number(form.rating),
            downloads: Number(form.downloads),
          }),
        });

        const data = await res.json();

        if (data.success) {
          alert("Template Updated Successfully ✅");
          router.push("/admin/templates");
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Something went wrong");
      } finally {
        setSaving(false);
      }
    }}
    disabled={saving}
    className="w-full py-4 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 disabled:opacity-50"
  >
    {saving ? "Saving..." : "Save Changes"}
  </button>

</div>
      </div>
    </div>
  );
}