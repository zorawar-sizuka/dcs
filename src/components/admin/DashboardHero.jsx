"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileText, Image, Video, FolderKanban, BookOpen, TrendingUp } from "lucide-react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import dashboardAnimation from "../../../public/lottie/services.json";
import { useDashboard } from "../../app/admin/dashboard/layout";

export default function DashboardHero() {
  const { setActiveTab } = useDashboard();
  const stats = [
    { id: "submissions", label: "Form Data", icon: FileText, color: "bg-[#E3F2FD]", accent: "text-blue-600" },
    { id: "photos", label: "Photos", icon: Image, color: "bg-[#E8F5E9]", accent: "text-green-600" },
    { id: "videos", label: "Videos", icon: Video, color: "bg-[#FEF9E7]", accent: "text-[#A3993D]" },
    { id: "projects", label: "Projects", icon: FolderKanban, color: "bg-[#E3F2FD]", accent: "text-blue-600" },
    { id: "blogs", label: "Blogs", icon: BookOpen, color: "bg-[#E8F5E9]", accent: "text-green-600" },
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Side: Text */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1.5px] w-8 bg-[#235fe7]" />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#235fe7]">
                Management Portal
              </span>
            </div>

            <h1 className="text-[2.8rem] md:text-[3.5rem] lg:text-[4rem] font-light leading-[1] tracking-tighter text-black mb-6">
              Control <br />
              <span className="font-bold text-[#235fe7]">Everything.</span>
            </h1>

            <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-md">
              Welcome back, Admin. Your central hub for keeping 
              DCS Corp's digital presence sharp, updated, and professional.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5E9] text-green-600 shadow-sm border border-green-100">
                <TrendingUp size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Instance Status
                </p>
                <p className="text-sm font-bold text-green-600">Active & Syncing</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Lottie Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="lg:col-span-7 bg-[#f8fafc] border border-black/5 rounded-[3rem] p-4 md:p-8 flex items-center justify-center relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-[#235fe7]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="w-full max-w-[500px]">
             <Lottie animationData={dashboardAnimation} loop={true} />
          </div>
        </motion.div>
      </div>

      {/* Quick Access Cards */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">
            Quick Actions
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                onClick={() => setActiveTab(stat.id)}
                className={`${stat.color} rounded-[2rem] p-6 border border-black/5 flex flex-col items-center justify-center text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group`}
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 ${stat.accent}`}>
                  <Icon size={26} />
                </div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#1A1A1A]">
                  {stat.label}
                </p>
                <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className={`h-1 w-6 rounded-full bg-current ${stat.accent} mx-auto`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
