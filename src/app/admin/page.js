"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Welcome back, Admin!");
        router.push("/admin/dashboard");
      } else {
        toast.error(data.error || "Invalid credentials");
      }
    } catch {
      toast.error("Connection error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-br from-[#f5f5f3] via-white to-[#E3F2FD]">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#235fe7]/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-[#03c326]/5 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-[440px]"
      >
        {/* Logo */}
        <div className="mb-10 text-center">
          <a href="/">
            <img
              src="/logo/logo.jpg"
              alt="DCS Logo"
              className="mx-auto h-14 w-auto object-contain mb-6"
            />
          </a>
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A]">
            Admin Panel
          </h1>
          <p className="mt-2 text-sm text-gray-400 font-medium">
            Sign in to manage your website
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-[2.5rem] border border-black/5 bg-white p-8 md:p-10 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Username */}
            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Username
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  className="w-full rounded-2xl border border-gray-100 bg-[#f8fafc] py-4 pl-12 pr-5 text-sm font-semibold text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#235fe7]/30 focus:bg-white focus:ring-2 focus:ring-[#235fe7]/10"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-gray-100 bg-[#f8fafc] py-4 pl-12 pr-12 text-sm font-semibold text-gray-900 outline-none transition-all placeholder:text-gray-400 focus:border-[#235fe7]/30 focus:bg-white focus:ring-2 focus:ring-[#235fe7]/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group relative mt-3 flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#1A1A1A] py-4.5 text-sm font-bold text-white transition-all hover:bg-[#235fe7] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Sign In
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
              <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-white/0 via-white/10 to-white/0 transition-transform duration-700 group-hover:translate-x-[120%]" />
            </button>
          </form>

          <p className="mt-6 text-center text-[10px] font-bold uppercase tracking-widest text-gray-300">
            First login auto-creates admin account
          </p>
        </div>
      </motion.div>
    </div>
  );
}
