"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Image,
  Video,
  FolderKanban,
  BookOpen,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";

// Context for sharing dashboard state
export const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) throw new Error("useDashboard must be used within DashboardLayout");
  return context;
};

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "submissions", label: "Form Data", icon: FileText },
  { id: "photos", label: "Photos", icon: Image },
  { id: "videos", label: "Videos", icon: Video },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "blogs", label: "Blogs", icon: BookOpen },
];

export default function DashboardLayout({ children }) {
  const [activeTab, setActiveTab] = useState("overview");
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Scroll to top when tab changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeTab]);

  useEffect(() => {
    fetch("/api/auth/verify")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) {
          router.push("/admin");
        } else {
          setAuthed(true);
        }
      })
      .catch(() => router.push("/admin"))
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    toast.success("Logged out successfully");
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-3 border-gray-100 border-t-[#235fe7]" />
      </div>
    );
  }

  if (!authed) return null;

  return (
    <DashboardContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="min-h-screen bg-white">
        {/* Top Header with Brand & Logout */}
        <header className="fixed top-0 left-0 right-0 z-50 flex h-20 items-center justify-between px-6 md:px-12 bg-white/80 backdrop-blur-xl border-b border-black/5">
          <div className="flex items-center gap-6">
            <a href="/" target="_blank" className="flex items-center gap-3">
              <img
                src="/logo/logo.jpg"
                alt="DCS"
                className="h-10 w-auto object-contain"
              />
              <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 hidden sm:block">
                Admin Portal
              </span>
            </a>
            
            {activeTab !== "overview" && (
              <button 
                onClick={() => setActiveTab("overview")}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#F8FAFC] border border-gray-100 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <LayoutDashboard size={14} />
                Overview
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
             <button
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl bg-red-50 px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-red-500 transition-all hover:bg-red-500 hover:text-white shadow-sm"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </header>

        {/* Main Content Area - Cool Toned Background */}
        <main className="pt-20 min-h-screen bg-[#F1F5F9]">
          <div className="pt-8 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </DashboardContext.Provider>
  );
}
