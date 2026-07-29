"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      console.log("LOGIN: Sending request...");

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      console.log("LOGIN: Response status:", res.status);

      const data = await res.json();

      console.log("LOGIN: Response data:", data);

      if (!res.ok || !data.success) {
        alert(data.message || "Login failed");
        return;
      }

      alert("Login Successful ✅");

      console.log("LOGIN: Redirecting to dashboard...");

      router.push("/");
router.refresh();
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Something went wrong. Check browser console.");
    } finally {
      setLoading(false);
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
          value={email}
          className="w-full p-4 mb-4 bg-zinc-800 rounded-lg text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full p-4 mb-6 bg-zinc-800 rounded-lg text-white"
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              login();
            }
          }}
        />

        <button
          type="button"
          onClick={login}
          disabled={loading}
          className="w-full bg-cyan-500 text-black py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}