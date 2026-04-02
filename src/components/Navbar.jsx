"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { usePathname } from "next/navigation"; 
// Import your InquiryModal component
import InquiryModal from "@/components/BookingButton"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal State
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname(); 

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = useMemo(
    () => [
      { name: "Home", href: "/" },
      { name: "Services", href: "/services" },
      { name: "Project", href: "/projects" }, 
      { name: "Blogs", href: "/blogs" },
      { name: "Contact", href: "/contact" },
    ],
    []
  );

  const isActiveLink = (href) => {
    if (!mounted) return false; 
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 pt-4 bg-transparent">
        <div className="mx-auto max-w-[1500px] flex items-center justify-between gap-4">
          
          {/* --- MAIN NAVIGATION PILL --- */}
          <div className="flex-1 bg-[#F3F3F3] rounded-full shadow-[0_18px_40px_rgba(0,0,0,0.12)] border border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between px-6 py-4 md:px-10">
              
              <a href="/" className="relative flex shrink-0 items-center">
                <img src="/logo/logo.jpg" alt="Logo" className="h-10 w-auto object-contain md:h-12 lg:h-14 rounded-lg" />
              </a>

              {/* Desktop Links */}
              <ul className="hidden lg:flex items-center justify-center gap-10 text-[13px] font-bold uppercase tracking-[0.2em] text-black absolute left-1/2 -translate-x-1/2">
                {navLinks.map((link) => {
                  const active = isActiveLink(link.href);
                  return (
                    <li key={link.name} className="relative">
                      <a href={link.href} className="group relative inline-flex cursor-pointer flex-col overflow-hidden pb-1">
                        <span className={`inline-block transition-transform duration-300 ${active ? "-translate-y-full" : "group-hover:-translate-y-full"}`}>
                          {link.name}
                        </span>
                        <span className={`absolute left-0 top-full inline-block transition-transform duration-300 ${active ? "-translate-y-full" : "group-hover:-translate-y-full"}`}>
                          {link.name}
                        </span>
                        <span className={`absolute bottom-0 left-0 h-[1.5px] bg-black/90 transition-all duration-300 ${active ? "w-full opacity-100" : "w-0 opacity-70 group-hover:w-full"}`} />
                      </a>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile Menu Toggle */}
              <button className="inline-flex items-center justify-center text-black lg:hidden p-2" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={26} strokeWidth={2.2} /> : <Menu size={26} strokeWidth={2.2} />}
              </button>

              <div className="hidden lg:block w-14 h-1"></div>
            </div>
          </div>

          {/* --- DESKTOP BLUE CTA --- */}
          <div className="hidden lg:block shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-[#235fe7] bg-[#e8f0fc] px-7 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#2862e8] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-500 hover:bg-white hover:border-black/20 hover:-translate-y-[2px] active:scale-95"
            >
              <span className="absolute inset-0 translate-x-[-150%] rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-[150%]" />
              <span className="relative z-[1]">Get Started</span>
              <span className="relative z-[1] flex h-7 w-7 items-center justify-center rounded-full border border-[#235fe7]/20 bg-[#235fe7]/5 backdrop-blur-sm transition-all duration-500 group-hover:bg-[#235fe7] group-hover:border-[#235fe7] group-hover:rotate-45">
                <span className="text-xs group-hover:text-white transition-colors">↗</span>
              </span>
            </button>
          </div>

          {/* --- MOBILE OVERLAY MENU --- */}
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/60 backdrop-blur-md lg:hidden z-[101]"
                  onClick={() => setIsOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed right-0 top-0 z-[102] h-screen w-[85%] max-w-[360px] bg-white lg:hidden flex flex-col shadow-2xl"
                >
                  <div className="flex items-center justify-between px-8 py-8 border-b border-gray-100">
                    <img src="/logo/logo.jpg" alt="Logo" className="h-10 w-auto rounded" />
                    <button onClick={() => setIsOpen(false)} className="p-2 bg-gray-100 rounded-full"><X size={24} /></button>
                  </div>
                  
                  <div className="flex flex-col gap-6 p-8 overflow-y-auto">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`text-3xl font-bold tracking-tighter flex justify-between items-center transition-colors ${isActiveLink(link.href) ? 'text-[#2862e8]' : 'text-gray-900'}`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name} <ArrowUpRight size={20} className="text-gray-300" />
                      </motion.a>
                    ))}
                  </div>

                  <div className="mt-auto p-8 border-t border-gray-100">
                    <button 
                      onClick={() => {
                        setIsOpen(false);
                        setIsModalOpen(true);
                      }}
                      className="w-full flex items-center justify-center gap-3 rounded-2xl bg-[#2862e8] py-5 text-sm font-black uppercase tracking-widest text-white shadow-xl active:scale-95 transition-all"
                    >
                      Get Started <ArrowUpRight size={18} />
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* --- GLOBAL INQUIRY MODAL (Renders Above Everything) --- */}
      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}