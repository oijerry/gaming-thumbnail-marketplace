"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  name: string;
  email: string;
  role: string;
};

export default function Navbar() {
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await fetch("/api/auth/me");

        const data = await res.json();

        if (data.success) {
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkLogin();
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout");

    setUser(null);

    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/70 backdrop-blur-md border-b border-cyan-500 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold text-cyan-400 cursor-pointer">
            GameThumb
          </h1>
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          <li>
            <Link href="/" className="hover:text-cyan-400">
              Home
            </Link>
          </li>

          <li>
            <Link href="/" className="hover:text-cyan-400">
              Categories
            </Link>
          </li>

          <li>
            <Link href="/" className="hover:text-cyan-400">
              Templates
            </Link>
          </li>

          <li>
            <Link href="/" className="hover:text-cyan-400">
              Pricing
            </Link>
          </li>

          <li>
            <Link href="/" className="hover:text-cyan-400">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right Buttons */}
        <div className="flex gap-3">

          {user ? (
            <>
              <Link href="/dashboard">
                <button className="px-5 py-2 bg-cyan-500 text-black rounded-lg font-bold">
                  Dashboard
                </button>
              </Link>

              {user.role === "admin" && (
                <Link href="/admin">
                  <button className="px-5 py-2 bg-yellow-500 text-black rounded-lg font-bold">
                    Admin
                  </button>
                </Link>
              )}

              <button
                onClick={logout}
                className="px-5 py-2 bg-red-500 text-white rounded-lg font-bold"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="px-5 py-2 border border-cyan-400 rounded-lg text-cyan-400 hover:bg-cyan-400 hover:text-black transition">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="px-5 py-2 bg-cyan-400 text-black rounded-lg hover:scale-105 transition">
                  Register
                </button>
              </Link>
            </>
          )}

        </div>

      </div>
    </nav>
  );
}