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
    <div className="absolute top-0 right-0 h-32 w-32 -translate-y-1/2 translate-x-1/2 z-20 hidden md:block">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full absolute inset-0">
          <path
            id="textPath"
            d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
            className="fill-none"
          />
          <text className="text-[10px] font-bold uppercase tracking-[0.15em] fill-[#235fe7]">
            <textPath href="#textPath" startOffset="0%">
              • DCS QUALITY • ESTABLISHED 1998 • PRECISION •
            </textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center h-10 w-10 bg-white rounded-full shadow-lg border-2 border-slate-100">
        <ArrowUpRight className="text-[#A3993D]" size={20} />
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <section className="relative w-[90%] mx-auto bg-white px-6 py-24 font-poppins lg:min-h-screen flex items-center overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2 lg:gap-24 relative">
          
          {/* LEFT COLUMN: Content & Stats */}
          <div className="flex flex-col order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
            <div className="flex items-center gap-4 mb-8">
  <div className="h-[1.5px] w-10 bg-[#A3993D]" />
  <span className="text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
    About Us
  </span>
</div>
              
              <h2 className="text-[2.8rem] font-light leading-[1] tracking-tight text-black md:text-[4rem] lg:text-[4.5rem] mb-10">
                Crafting <span className="font-bold">Surfaces</span> <br />
                With Soul.
              </h2>
              
              <p className="text-lg text-slate-500 max-w-lg mb-12 font-medium leading-relaxed">
                Founded with a vision to democratize elite infrastructure, we bridge the gap between potential and luxury. We don't just lay floors; we architect environments through radical transparency and precision.
              </p>
            </motion.div>

            {/* Stat Grid */}
            <div className="grid grid-cols-2 gap-4 max-w-md">
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

          {/* RIGHT COLUMN: Bento Grid with Revolving Label */}
          <div className="relative order-1 lg:order-2">
            <RevolvingLabel />

            <div className="grid grid-cols-12 grid-rows-12 gap-3 h-[450px] md:h-[600px] p-2 bg-slate-50/50 rounded-[2.5rem]">
              
              {/* Main Bento Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="col-span-8 row-span-8 relative overflow-hidden rounded-[2rem] shadow-xl border-4 border-white group"
              >
                <img src="/images/about_dsc.jpg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Main" />
              </motion.div>

              {/* Side Bento Card */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="col-span-4 row-span-12 relative overflow-hidden rounded-[2rem] shadow-lg border-4 border-white group"
              >
                <img src="/hero/hero2.jpeg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Process" />
              </motion.div>

              {/* Bottom Bento Card */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="col-span-8 row-span-4 relative overflow-hidden rounded-[2rem] shadow-lg border-4 border-white group"
              >
                <img src="/services/service1.jpeg" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="Detail" />
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;