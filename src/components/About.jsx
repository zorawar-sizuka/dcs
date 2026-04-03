"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Stat card data with the requested Light Green and Light Blue colors
const statistics = [
  { value: "25", suffix: "+", label: "Years of Grit", bgColor: "bg-[#E8F5E9]" },
  { value: "500", suffix: "+", label: "Elite Projects", bgColor: "bg-[#E3F2FD]" },
  { value: "120", suffix: "+", label: "Expert Crew", bgColor: "bg-[#E3F2FD]" },
  { value: "12", suffix: "+", label: "Global Awards", bgColor: "bg-[#E8F5E9]" },
];

const CounterStat = ({ value, suffix = "", label, delay = 0, bgColor = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(value, 10);
    const duration = 2000;
    const stepTime = Math.max(12, Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      className={`flex flex-col items-center justify-center p-6 rounded-[1.5rem] ${bgColor} border border-black/5 shadow-sm text-center`}
    >
      <div className="text-3xl md:text-4xl font-bold tracking-tighter text-black">
        {count}{suffix}
      </div>
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40 mt-2">
        {label}
      </p>
    </motion.div>
  );
};

const RevolvingLabel = () => {
  return (
    <div className="absolute -top-12 -right-12 h-40 w-40 z-30 hidden md:block">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full flex items-center justify-center p-2 rounded-full border border-black/5 bg-white/20 backdrop-blur-md"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0 drop-shadow-sm">
          <path
            id="textPath"
            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
            className="fill-none"
          />
          <text className="text-[12px] font-black uppercase tracking-[0.2em] fill-[#1A1A1A]">
            <textPath href="#textPath" startOffset="0%">
              • PREMIUM QUALITY • DCS CORP EST. 1998 • PRECISION •
            </textPath>
          </text>
        </svg>
        <div className="h-14 w-14 bg-[#235fe7] rounded-full flex items-center justify-center shadow-lg border-2 border-white transform rotate-[-45deg]">
          <ArrowUpRight className="text-white" size={24} strokeWidth={3} />
        </div>
      </motion.div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="relative w-full bg-white px-6 py-32 font-poppins overflow-hidden">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="grid grid-cols-1 items-start gap-20 lg:grid-cols-2 lg:gap-32">
          
          {/* LEFT COLUMN: Content & Stats */}
          <div className="flex flex-col lg:sticky lg:top-32">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[2px] w-12 bg-[#235fe7]" />
                <span className="text-[12px] font-black uppercase tracking-[0.5em] text-[#235fe7]">
                  The Legacy
                </span>
              </div>
              
              <h2 className="text-[3.5rem] md:text-[5rem] font-light leading-[0.95] tracking-tighter text-black mb-10">
                Crafting <span className="font-bold">Surfaces</span> <br />
                With Soul.
              </h2>
              
              <p className="text-xl text-slate-500 max-w-lg mb-16 font-medium leading-relaxed">
                Founded with a vision to democratize elite infrastructure, we bridge the gap between potential and luxury. We don't just lay floors; we architect environments through radical transparency and precision.
              </p>
            </motion.div>

            {/* Stat Grid */}
            <div className="grid grid-cols-2 gap-6 max-w-md">
              {statistics.map((stat, index) => (
                <CounterStat 
                  key={index}
                  value={stat.value} 
                  suffix={stat.suffix} 
                  label={stat.label} 
                  delay={0.1 * (index + 1)} 
                  bgColor={stat.bgColor} 
                />
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Bento Grid */}
          <div className="relative pt-12 lg:pt-0">
            <RevolvingLabel />

            <div className="grid grid-cols-6 grid-rows-6 gap-3 h-[500px] md:h-[650px]">
              
              {/* Item 1: Large Vertical */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="col-span-3 row-span-4 relative overflow-hidden rounded-[2.5rem] shadow-xl group border border-black/5"
              >
                <img src="/images/about2_dcs.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Main" />
              </motion.div>

              {/* Item 2: Square Top Right */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="col-span-3 row-span-2 relative overflow-hidden rounded-[2.5rem] shadow-lg group border border-black/5"
              >
                <img src="/images/about1_dcs.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Process" />
              </motion.div>

              {/* Item 3: Wide Bottom Right */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="col-span-3 row-span-4 relative overflow-hidden rounded-[2.5rem] shadow-lg group border border-black/5"
              >
                <img src="/images/about3_dcs.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Detail" />
              </motion.div>

              {/* Item 4: Bottom Left Visual */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="col-span-3 row-span-2 relative overflow-hidden rounded-[2.5rem] shadow-lg group border border-black/5"
              >
                <img src="/images/about4_dcs.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="About 4" />
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;