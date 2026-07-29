"use client";

import { useState } from "react";

type Props = {
  templateId: string;
};

export default function ReviewForm({ templateId }: Props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async () => {
    if (!comment.trim()) {
      alert("Please write a review.");
      return;
    }

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        templateId,
        rating,
        comment,

        // नंतर login system मधून userId येईल
        userId: "PUT_USER_ID_HERE",
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Review Added Successfully ⭐");
      setComment("");
      setRating(5);

      location.reload();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 mt-10">

      <h2 className="text-2xl font-bold mb-5">
        Write Review
      </h2>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="w-full p-3 rounded-lg bg-zinc-800 mb-5"
      >
        <option value={5}>⭐⭐⭐⭐⭐</option>
        <option value={4}>⭐⭐⭐⭐</option>
        <option value={3}>⭐⭐⭐</option>
        <option value={2}>⭐⭐</option>
        <option value={1}>⭐</option>
      </select>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review..."
        className="w-full h-36 p-4 rounded-lg bg-zinc-800"
      />

      <button
        onClick={submitReview}
        className="mt-5 bg-cyan-500 text-black px-8 py-3 rounded-xl font-bold"
      >
        Submit Review
      </button>

    </div>
  );
}