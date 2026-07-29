"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const login = async () => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      alert("Login Successful ✅");
      router.push("/dashboard");
      router.refresh();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("Something went wrong");
  }
};

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">
      <div className="bg-zinc-900 p-8 rounded-xl w-[400px] border border-cyan-500">

        <h1 className="text-4xl text-cyan-400 font-bold mb-8 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 mb-4 bg-zinc-800 rounded-lg text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 mb-6 bg-zinc-800 rounded-lg text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-cyan-500 text-black py-3 rounded-xl font-bold"
        >
          Login
        </button>

      </div>
    </div>
  );
}