"use client";

import { useState } from "react";
import PaymentButton from "@/components/Payment/PaymentButton";

type Template = {
  _id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  badge: string;
  price: number;
  rating: number;
  downloads: number;
};

type Props = {
  templateId: string;
  template: Template;
};

export default function TemplateDetailsClient({
  templateId,
  template,
}: Props) {
  const [customerName, setCustomerName] = useState("");
  const [customerImage, setCustomerImage] = useState("");

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setCustomerImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* LEFT SIDE */}

      <div className="space-y-6">

        <img
          src={template.image}
          alt={template.title}
          className="rounded-2xl border border-cyan-500 w-full"
        />

        <div>

          <div className="flex items-center gap-3">

            <h1 className="text-4xl font-bold">
              {template.title}
            </h1>

            {template.badge && (
              <span className="bg-cyan-500 px-3 py-1 rounded-full text-sm">
                {template.badge}
              </span>
            )}

          </div>

          <p className="text-gray-400 mt-4">
            {template.description}
          </p>

          <div className="flex gap-8 mt-6">

            <p>
              ⭐ {template.rating}
            </p>

            <p>
              ⬇ {template.downloads}
            </p>

            <p>
              🎮 {template.category}
            </p>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="bg-zinc-900 rounded-2xl p-8 h-fit border border-cyan-500">

        <h2 className="text-3xl font-bold">
          Checkout
        </h2>

        <p className="text-5xl font-bold text-cyan-400 mt-5">
          ₹{template.price}
        </p>

        <div className="mt-8">

          <label className="block mb-2">
            Your Name
          </label>

          <input
            value={customerName}
            onChange={(e) =>
              setCustomerName(e.target.value)
            }
            placeholder="Enter Your Name"
            className="w-full p-4 rounded-xl bg-black border border-zinc-700"
          />

        </div>

        <div className="mt-6">

          <label className="block mb-2">
            Upload Your Photo
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="w-full"
          />

          {customerImage && (
            <img
              src={customerImage}
              className="mt-5 rounded-xl border border-cyan-500"
              alt="Preview"
            />
          )}

        </div>

                <div className="mt-8 border-t border-zinc-700 pt-6">

          <h3 className="text-xl font-bold mb-4">
            Order Summary
          </h3>

          <div className="flex justify-between mb-3">
            <span>Template</span>
            <span>{template.title}</span>
          </div>

          <div className="flex justify-between mb-3">
            <span>Category</span>
            <span>{template.category}</span>
          </div>

          <div className="flex justify-between text-2xl font-bold border-t border-zinc-700 pt-4">
            <span>Total</span>
            <span className="text-cyan-400">
              ₹{template.price}
            </span>
          </div>

        </div>

        <PaymentButton
          templateId={templateId}
          amount={template.price}
          templateName={template.title}
          customerName={customerName}
          customerImage={customerImage}
        />

      </div>

    </>
  );
}
