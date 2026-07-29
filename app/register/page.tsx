"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async () => {
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      setLoading(false);

      if (data.success) {
        alert("Registration Successful ✅");
        router.push("/login");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-5">

      <div className="bg-zinc-900 border border-cyan-500 rounded-2xl p-8 w-full max-w-md">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          Register
        </h1>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-lg bg-zinc-800 text-white"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-4 mb-4 rounded-lg bg-zinc-800 text-white"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-4 mb-6 rounded-lg bg-zinc-800 text-white"
        />

        <button
          onClick={register}
          disabled={loading}
          className="w-full py-4 bg-cyan-500 text-black rounded-xl font-bold disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </div>

    </div>
  );
}