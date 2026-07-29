"use client";

import { useState } from "react";

const [uploading, setUploading] = useState(false);

type Props = {
  imageUrl: string;
  setImageUrl: (url: string) => void;
};

export default function UploadSection({
  imageUrl,
  setImageUrl,
}: Props) {
  
  const [files, setFiles] = useState<FileList | null>(null);

  const uploadImage = async (file: File) => {
  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      setImageUrl(data.image);
    } else {
      alert("Upload Failed");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong");
  } finally {
    setUploading(false);
  }
};

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Upload Your Resources
      </h2>

      <input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setFiles(e.target.files);

    void uploadImage(file);
  }}
  className="w-full p-4 bg-black rounded-xl"
/>

      {files && (
        <div className="mt-5 space-y-2">
          {Array.from(files).map((file) => (
            <p key={file.name} className="text-green-400">
              ✅ {file.name}
            </p>
          ))}
        </div>
      )}

      {imageUrl && (
  <img
    src={imageUrl}
    alt="Preview"
    className="mt-6 rounded-xl border border-cyan-500 w-full"
  />
)}

{uploading && (
  <p className="text-cyan-400 mt-4">
    Uploading...
  </p>
)}

    </div>
  );
}