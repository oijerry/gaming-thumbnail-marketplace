"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (
      username === "admin" &&
      password === "gaming123"
    ) {
      localStorage.setItem("adminLoggedIn", "true");

      router.push("/admin");
    } else {
      alert("Invalid Username or Password");
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center">

      <div className="bg-zinc-900 p-10 rounded-xl border border-cyan-500 w-[400px]">

        <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
          Admin Login
        </h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-800 text-white mb-5"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-xl bg-zinc-800 text-white mb-8"
        />

        <button
          onClick={login}
          className="w-full bg-cyan-500 text-black py-4 rounded-xl font-bold hover:bg-cyan-400"
        >
          Login
        </button>

      </div>

    </div>
  );
}