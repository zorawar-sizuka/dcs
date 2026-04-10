



"use client";
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation"; 
import InquiryModal from "@/components/BookingButton"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Form State
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
      <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 pt-4 bg-transparent font-poppins">
        <div className="mx-auto max-w-[1500px] flex items-center justify-between gap-4">
          
          {/* PILL DOCK CONTAINER */}
          <div className="flex-1 bg-[#F3F3F3] rounded-full shadow-[0_18px_40px_rgba(0,0,0,0.12)] border border-white/20 transition-all duration-300">
            <div className="flex items-center justify-between px-6 py-4 md:px-10">
              
              <a href="/" className="relative flex shrink-0 items-center">
                {/* REVERTED: Exact original logo sizing */}
                <img src="/logo/logo.jpg" alt="Logo" className="h-10 w-auto object-contain md:h-12 lg:h-14" />
              </a>

              {/* NavLinks - Centered */}
              {/* REVERTED: Exact original text-[15px] and spacing */}
              <ul className="hidden lg:flex items-center justify-center gap-10 text-[15px] font-medium uppercase tracking-[0.18em] text-black absolute left-1/2 -translate-x-1/2">
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

              <button className="inline-flex items-center justify-center text-black lg:hidden" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <X size={26} strokeWidth={2.2} /> : <Menu size={26} strokeWidth={2.2} />}
              </button>

              <div className="hidden lg:block w-14 h-1"></div>
            </div>
          </div>

          {/* BLUE CTA - NOW TRIGGERS FORM */}
          <div className="hidden lg:block shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-[#235fe7] bg-[#e8f0fc] px-7 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-[#2862e8] shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 hover:bg-white hover:text-[#2862e8] hover:border-black/20 hover:-translate-y-[1px]"
            >
              <span className="absolute inset-0 translate-x-[-120%] rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 transition-transform duration-700 group-hover:translate-x-[120%]" />
              <span className="relative z-[1]">Get Started</span>
              <span className="relative z-[1] flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:border-[#2862e8]">
                <span className="text-xs group-hover:text-[#2862e8]">↗</span>
              </span>
            </button>
          </div>

          {/* MOBILE OVERLAY */}
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/40 backdrop-blur-sm lg:hidden z-[101]"
                  onClick={() => setIsOpen(false)}
                />
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "100%" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="fixed right-0 top-0 z-[102] h-screen w-[85%] max-w-[350px] bg-white lg:hidden flex flex-col"
                >
                  <div className="flex items-center justify-between px-8 py-6 border-b border-gray-100">
                    <img src="/logo/logo.jpg" alt="Logo" className="h-10 w-auto" />
                    <button onClick={() => setIsOpen(false)}><X size={28} /></button>
                  </div>
                  <div className="flex flex-col gap-4 p-8 overflow-y-auto">
                    {navLinks.map((link, i) => (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-2xl font-bold tracking-tighter text-gray-900 flex justify-between items-center"
                      >
                        {link.name} <span className="text-gray-300 text-lg">↗</span>
                      </motion.a>
                    ))}
                    
                    {/* Added Mobile Trigger for consistency */}
                    <button 
                      onClick={() => { setIsOpen(false); setIsModalOpen(true); }}
                      className="mt-6 w-full py-4 bg-[#2862e8] text-white font-black text-[11px] uppercase tracking-widest rounded-xl"
                    >
                      Get Started
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Renders the form above everything */}
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}