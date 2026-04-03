"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import InquiryModal from "@/components/BookingButton";
import {
  Layers3,
  Hammer,
  ShieldCheck,
  Building2,
  Home,
  ArrowRight,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center rounded-[2.5rem] bg-slate-50 animate-pulse" />
  ),
});

// import servicesAnimation from "../../../public/lottie/services.json"; 
import servicesAnimation from "../../../public/lottie/services2_dcs.json";

const serviceCards = [
  {
    title: "Installation",
    description: "Precision laying of hardwood, vinyl plank, and commercial carpet systems with structural focus.",
    icon: <Layers3 size={24} />,
    bgColor: "bg-[#E8F5E9]", 
    accent: "text-green-700",
    points: ["Residential floors", "Commercial spaces", "Seamless finish"],
  },
  {
    title: "Restoration",
    description: "Targeted repair work, section replacement, and surface recovery for aging infrastructures.",
    icon: <Hammer size={24} />,
    bgColor: "bg-[#E3F2FD]", 
    accent: "text-blue-700",
    points: ["Damage correction", "Edge refinement", "Finish recovery"],
  },
  {
    title: "Maintenance",
    description: "Care plans that protect performance, extend lifecycle, and preserve visual integrity.",
    icon: <ShieldCheck size={24} />,
    bgColor: "bg-[#FEF9E7]", 
    accent: "text-[#A3993D]",
    points: ["Lifecycle support", "Surface care", "Ongoing upkeep"],
  },
];

const ServicesInfographicSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="relative w-full bg-white px-6 py-20 font-poppins overflow-hidden">
      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <div className="mx-auto max-w-[1440px]">
        
        {/* 1. HERO INTRO & LOTTIE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 mt-12">
          <div className="lg:col-span-5 text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[3.2rem] md:text-[4.5rem] font-light leading-[1.05] tracking-tighter text-black mb-8"
            >
              Flooring <br />
              <span className="font-bold text-[black]">Systems</span> <br />
              Defined.
            </motion.h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md mx-auto lg:mx-0">
              We provide a full-spectrum approach to floor surfaces, combining material durability with clean, industrial-grade execution.
            </p>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="lg:col-span-7 bg-[#e3f2fd] rounded-[3rem] p-8 aspect-video flex items-center justify-center"
          >
            <div className="w-full max-w-[480px]">
              <Lottie animationData={servicesAnimation} loop={true} />
            </div>
          </motion.div>
        </div>

        {/* 2. CENTERED SECTION LABEL (Above Cards) */}
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-[1.5px] w-8 bg-[#A3993D]" />
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
              Our Capabilities
            </span>
            <div className="h-[1.5px] w-8 bg-[#A3993D]" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-black tracking-tight">Core Services</h3>
        </div>

        {/* 3. PRIMARY SERVICE TILES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {serviceCards.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group p-10 rounded-[2.5rem] ${service.bgColor} border border-black/5 flex flex-col justify-between min-h-[400px] transition-all duration-500 hover:shadow-xl hover:shadow-black/5`}
            >
              <div>
                <div className="flex justify-between items-start mb-8">
                  <div className={`p-4 rounded-2xl bg-white shadow-sm ${service.accent}`}>
                    {service.icon}
                  </div>
                  <ExternalLink size={20} className="text-black/10 group-hover:text-black/30 transition-colors" />
                </div>
                <h3 className="text-3xl font-bold tracking-tighter text-black mb-4">{service.title}</h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">{service.description}</p>
              </div>
              <div className="space-y-3 pt-6 border-t border-black/5">
                {service.points.map((point) => (
                  <div key={point} className="flex items-center gap-3 text-[12px] font-bold uppercase tracking-wider text-black/60">
                    <CheckCircle2 size={16} className={service.accent} />
                    {point}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* 4. BENTO ZONE (Process, Sectors, Materials) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-7 bg-[#f8fafc] rounded-[2.5rem] p-10 md:p-12 border border-slate-200 relative overflow-hidden"
          >
            <div className="relative z-10">
              <h3 className="text-3xl font-bold tracking-tight text-slate-900 mb-12 flex items-center gap-4">
                Our Process <span className="h-[1px] w-12 bg-[#A3993D]" />
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                {[
                  { no: "01", title: "Analysis", desc: "Defining load requirements and aesthetic direction." },
                  { no: "02", title: "Prep", desc: "Subfloor moisture testing and surface leveling." },
                  { no: "03", title: "Install", desc: "Industrial-grade installation with seamless edges." },
                  { no: "04", title: "Certify", desc: "Final buffing and quality certification." }
                ].map((step) => (
                  <div key={step.no} className="group cursor-default">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-[#A3993D] font-black text-xl">{step.no}</span>
                      <div className="h-[1px] w-8 bg-slate-300 group-hover:w-12 transition-all group-hover:bg-[#A3993D]" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-[#A3993D] transition-colors">{step.title}</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT STACK: SECTORS & MATERIALS */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div whileHover={{ y: -5 }} className="flex-1 bg-[#E3F2FD] rounded-[2.5rem] p-10 border border-blue-200 group">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-white shadow-sm text-blue-600"><Building2 size={22} /></div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Active Sectors</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["Retail", "Corporate", "Healthcare", "Sports"].map((tag) => (
                  <span key={tag} className="px-5 py-2.5 rounded-xl bg-white/70 backdrop-blur-sm text-blue-800 text-[11px] font-black uppercase tracking-widest border border-blue-200/50 hover:bg-blue-600 hover:text-white transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="flex-1 bg-[#E8F5E9] rounded-[2.5rem] p-10 border border-green-200 group">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-white shadow-sm text-green-600"><Home size={22} /></div>
                <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Materials</h3>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {["Hardwood", "Vinyl", "Carpet", "Stone"].map((tag) => (
                  <span key={tag} className="px-5 py-2.5 rounded-xl bg-white/70 backdrop-blur-sm text-green-800 text-[11px] font-black uppercase tracking-widest border border-green-200/50 hover:bg-green-600 hover:text-white transition-all cursor-default">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* 5. BOTTOM CTA */}
        <div className="mt-20 flex justify-center">
           <motion.button 
             onClick={() => setIsModalOpen(true)}
             whileHover={{ scale: 1.05 }}
             className="group flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full font-bold text-xs tracking-[0.2em] uppercase transition-all hover:bg-[#A3993D]"
           >
             Start Your Journey
             <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
           </motion.button>
        </div>
      </div>
    </section>
  );
};
 
export default ServicesInfographicSection; 






