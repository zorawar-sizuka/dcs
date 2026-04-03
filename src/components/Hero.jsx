
"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const slides = [
  {
    image: '/hero/hero1.jpg',
    title: "Transform Your Space",
    subtitle: "with Premium Flooring Solutions"
  }, 

  {
    image: '/hero/hero2.jpeg',
    title: "Architectural Vinyl",
    subtitle: "Modern Aesthetics for Commercial Spaces"
  },

  {
    image: '/hero/hero3.jpeg',
    title: "Expert Craftsmanship",
    subtitle: "Professional Repair & Construction"
  }, 
  {
    image: '/hero/hero4.jpeg',
    title: "Elite Sports Courts",
    subtitle: "High-Performance Futsal & Basketball Surfaces"
  },
 
];

export default function LandingHero() {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.serviceType) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'hero' })
      });

      if (res.ok) {
        toast.success('Quote request sent successfully!');
        setFormData({ name: '', email: '', phone: '', serviceType: '' });
      } else {
        toast.error('Failed to send request. Try again.');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#1A1A1A]">
      
      {/* 1. Full Screen Background Carousel */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slides[current].image})` }}
            >
              {/* Dark Gradient Overlays for Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
              {/* <div className="absolute inset-0 bg-black/10" /> */}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col items-center justify-center px-6 pt-20 md:flex-row md:justify-between md:px-12">
        
        {/* Left Side: Headline */}
        <div className="w-full text-white md:w-3/5">
          <motion.div
            key={current + "text"}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <span className="mb-4 block text-[10px] font-black uppercase tracking-[0.5em] text-[#02c225]">
              Est. 1998 — DCS Quality
            </span>
            <h1 className="text-5xl font-light leading-[0.95] tracking-tighter sm:text-7xl md:text-[6.5rem] lg:text-[7.5rem]">
              {slides[current].title.split(' ')[0]} <br />
              <span className="font-bold text-[#93b0fa]">{slides[current].title.split(' ').slice(1).join(' ')}</span>
            </h1>
            <p className="mt-6 max-w-md text-lg text-gray-300 font-medium">
              {slides[current].subtitle}
            </p>
          </motion.div>

          {/* Minimalist Indicators - Hidden on Mobile */}
          <div className="mt-12 hidden md:flex items-center gap-4">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`group relative h-1 transition-all duration-500 ${
                  current === i ? 'w-16 bg-[#02c225]/60' : 'w-8 bg-white/30 hover:bg-white/60'
                }`}
              >
                <span className="absolute -top-6 left-0 text-[10px] font-bold opacity-0 transition-opacity group-hover:opacity-100">
                  0{i + 1}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: The Navbar-Inspired Form Card - HIDDEN ON MOBILE */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="hidden md:block w-full max-w-[400px] rounded-[2.5rem] bg-[#F3F3F3] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white"
        >
          <div className="mb-8 flex items-center gap-4">
            {/* Blue texture circle matches your Navbar CTA style */}
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f0fc] border border-[#235fe7] text-[#2862e8]">
              <Calendar size={22} strokeWidth={2.5} />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-gray-900">Book a Quote</h3>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Response within 24h</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Full Name *"
              className="w-full rounded-2xl border-none bg-white px-6 py-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#2862e8]/20"
            />
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="Email Address *"
              className="w-full rounded-2xl border-none bg-white px-6 py-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#2862e8]/20"
            />
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="Phone Number (Optional)"
              className="w-full rounded-2xl border-none bg-white px-6 py-4 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-all focus:ring-2 focus:ring-[#2862e8]/20"
            />
            <div className="relative">
              <select 
                required
                value={formData.serviceType}
                onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                className={`w-full appearance-none rounded-2xl border-none bg-white px-6 py-4 text-sm font-medium outline-none focus:ring-2 focus:ring-[#2862e8]/20 ${formData.serviceType ? 'text-gray-900' : 'text-gray-400'}`}
              >
                <option value="" disabled>Select Service *</option>
                <option value="Residential Flooring">Residential Flooring</option>
                <option value="Sports/Futsal Courts">Sports/Futsal Courts</option>
                <option value="Commercial Repair">Commercial Repair</option>
              </select>
              <span className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-300">▼</span>
            </div>
            
            {/* Blue Button matches your Navbar "Get Started" */}
            <button 
              type="submit"
              disabled={loading}
              className="group relative mt-4 flex w-full items-center justify-center gap-4 overflow-hidden rounded-full bg-[#e8f0fc] border border-[#235fe7] py-5 text-[11px] font-black uppercase tracking-widest text-[#2862e8] transition-all hover:bg-white disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="relative z-10">{loading ? 'Sending...' : 'Send Request'}</span>
              {loading ? (
                <Loader2 size={18} className="relative z-10 animate-spin" />
              ) : (
                <ArrowRight size={18} className="relative z-10 transition-transform group-hover:translate-x-1" />
              )}
              <span className="absolute inset-0 translate-x-[-120%] rounded-full bg-gradient-to-r from-white/0 via-white/40 to-white/0 transition-transform duration-700 group-hover:translate-x-[120%]" />
            </button>
          </form>
        </motion.div>

      </div>
      
      {/* Scroll Hint */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30"
      >
        <div className="h-10 w-[1px] bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>

    </section>
  );
}