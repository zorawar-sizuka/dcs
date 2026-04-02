"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const CounterStat = ({ value, suffix = "", label, delay = 0, borderClasses = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseInt(value, 10);
    const duration = 1500;
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
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay, duration: 0.4 }}
      className={`flex flex-col items-start justify-center p-5 md:p-8 ${borderClasses}`}
    >
      <div className="text-[1.8rem] font-medium tracking-tighter text-[#0D3A4B] md:text-[2.4rem]">
        {count}{suffix}
      </div>
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#0D3A4B]/50">
        {label}
      </p>
    </motion.div>
  );
};

const AboutSection = () => {
  return (
    <section className="relative w-full bg-[#f3f3f3] px-6 py-12 font-poppins lg:h-[90vh] lg:min-h-[750px] flex items-center">
      <div className="mx-auto w-full max-w-[1440px]">
        
        {/* Main Grid set to stretch so columns are equal height */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-24">
          
          {/* Left Column: Title at top, Image pushed to bottom */}
          <div className="flex flex-col h-full">
            <motion.span 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[14px] font-bold uppercase tracking-[0.2em] text-[#0D3A4B] mb-8"
            >
              About Us
            </motion.span>
            
            {/* Wrapper pushed to bottom of the column */}
            <div className="mt-auto hidden lg:flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="relative w-full overflow-hidden rounded-[2rem] bg-white/20 shadow-sm aspect-[16/10]"
              >
                <img
                  src="/images/about_dsc.jpg" 
                  alt="Flooring Excellence"
                  className="h-full w-full object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* Right Column: Headline at top, Quadrant at bottom */}
          <div className="flex flex-col h-full pt-[3px]"> 
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <h2 className="text-[2.2rem] font-medium leading-[1.1] tracking-[-0.04em] text-[#0D3A4B] md:text-[3.2rem] lg:text-[3.8rem] xl:text-[4.2rem]">
                Powering modern interiors through thoughtful flooring.
              </h2>
            </motion.div>

            {/* Quadrant Stats pushed to bottom to match left image base */}
            <div className="mt-auto grid grid-cols-2 rounded-3xl border border-[#0D3A4B]/10 bg-white/40 shadow-sm">
              <CounterStat 
                value="25" suffix="+" label="Years Experience" delay={0.1} 
                borderClasses="border-r border-b border-[#0D3A4B]/10"
              />
              <CounterStat 
                value="500" suffix="+" label="Projects Done" delay={0.2} 
                borderClasses="border-b border-[#0D3A4B]/10"
              />
              <CounterStat 
                value="120" suffix="+" label="Spaces Saved" delay={0.3} 
                borderClasses="border-r border-[#0D3A4B]/10"
              />
              <CounterStat 
                value="12" suffix="+" label="Categories" delay={0.4} 
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;