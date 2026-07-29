"use client";

import Link from "next/link";
import { useState } from "react";

type Props = {
  template: {
    _id: string;
    title: string;
    category: string;
    price: number;
    image: string;
    badge: string;
    rating: number;
    downloads: number;
  };
};

export default function TemplateCard({ template }: Props) {
  const [loading, setLoading] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  const addToWishlist = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateId: template._id,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setWishlisted(true);
        alert("❤️ Added to Wishlist");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-cyan-500 hover:scale-105 transition duration-300 hover:shadow-[0_0_35px_#00ffff]">

      {/* Wishlist Button */}
      <button
        onClick={addToWishlist}
        disabled={loading}
        className="absolute top-4 right-4 z-20 bg-black/70 w-11 h-11 rounded-full text-2xl hover:scale-110 transition"
      >
        {wishlisted ? "❤️" : "🤍"}
      </button>

      <img
        src={template.image}
        alt={template.title}
        className="w-full h-60 object-cover"
      />

      <div className="p-5">

        <span className="text-xs bg-cyan-500 text-black px-3 py-1 rounded-full">
          {template.badge}
        </span>

        <h2 className="text-white text-xl font-bold mt-4">
          {template.title}
        </h2>

        <p className="text-gray-400 mt-2">
          {template.category}
        </p>

        <div className="flex justify-between mt-5">

          <span className="text-cyan-400 font-bold text-xl">
            ₹{template.price}
          </span>

          <span className="text-yellow-400">
            ⭐ {template.rating}
          </span>

        </div>

        <p className="text-sm text-gray-500 mt-2">
          {template.downloads}+ Downloads
        </p>

        <Link href={`/templates/${template._id}`}>
          <button className="w-full mt-5 bg-cyan-500 text-black py-3 rounded-xl font-bold hover:bg-cyan-400">
            Buy Now
          </button>
        </Link>

      </div>
    </div>
  );
}