"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddTemplatePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    category: "",
    description: "",
    badge: "",
    price: "",
    rating: "5",
    downloads: "0",
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [psdFile, setPsdFile] = useState<File | null>(null);

  const [uploading, setUploading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  async function uploadFile(file: File) {
    const data = new FormData();

    data.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: data,
    });

    const json = await res.json();

    if (!json.success) {
      throw new Error("Upload Failed");
    }

    return json.url;
  }

  const submitTemplate = async () => {
  try {
    if (!thumbnailFile || !zipFile) {
      alert("Thumbnail and ZIP file are required.");
      return;
    }

    setUploading(true);

    // Upload Thumbnail
    const imageUrl = await uploadFile(thumbnailFile);

    // Upload ZIP
    const zipUrl = await uploadFile(zipFile);

    // Upload PSD (Optional)
    let psdUrl = "";

    if (psdFile) {
      psdUrl = await uploadFile(psdFile);
    }

    // Save Template
    const res = await fetch("/api/templates", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: form.title,
        image: imageUrl,
        category: form.category,
        description: form.description,
        badge: form.badge,
        price: Number(form.price),
        rating: Number(form.rating),
        downloads: Number(form.downloads),
        downloadZip: zipUrl,
        downloadPsd: psdUrl,
      }),
    });

    const data = await res.json();

    setUploading(false);

    if (data.success) {
      alert("Template Added Successfully ✅");
      router.push("/admin");
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    setUploading(false);
    alert("Something went wrong");
  }
};
}