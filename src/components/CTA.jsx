// components/CTASection.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="bg-[#f7f7f4] px-4 py-6  md:py-8">
      <div className="mx-auto max-w-[1440px]">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-black/6 bg-white sm:min-h-[360px] md:min-h-[400px] lg:min-h-[430px]"
        >
          <motion.div
            animate={{ scale: [1.02, 1.06, 1.02] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/cta_dsc.jpeg')",
              }}
            />
          </motion.div>

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(3,195,38,0.10),transparent_22%),radial-gradient(circle_at_top_right,rgba(0,61,186,0.10),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(163,153,61,0.10),transparent_20%)]" />

          <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-8 md:p-10 lg:flex-row lg:items-end lg:p-12">
            <div className="max-w-[760px]">
              <div className="w-full max-w-[640px] rounded-[1.75rem] border border-white/20 bg-white/12 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.12)] backdrop-blur-[18px] supports-[backdrop-filter]:bg-white/10 sm:p-6 md:rounded-[2rem] md:p-8">
                <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/18 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] text-white backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#03c326]" />
                  <span className="h-2 w-2 rounded-full bg-[#003dba]" />
                  DCS
                </span>

                <h2 className="max-w-[12ch] text-[2rem] font-semibold leading-[1.03] tracking-[-0.05em] text-white sm:text-[2.5rem] md:text-[3rem] lg:text-[3.6rem]">
                  Bring timeless flooring into modern living.
                </h2>

                <p className="mt-4 max-w-[580px] text-sm leading-relaxed text-white/80 sm:text-[15px] md:text-base">
                  From hardwood and vinyl to stone and carpet, we create refined
                  surfaces with craftsmanship, durability, and a quietly premium finish.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-8 sm:gap-10">
                  <div>
                    <div className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">25+</div>
                    <div className="mt-1 text-sm text-white/68">Years of craft</div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold tracking-[-0.04em] text-white sm:text-3xl">500+</div>
                    <div className="mt-1 text-sm text-white/68">Spaces transformed</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 lg:mt-0">
              <motion.button
                whileHover={{ scale: 1.02 }}
                className="group inline-flex items-center gap-3 rounded-full border border-black/10 bg-[#111111] px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#A3993D]"
              >
                Start Your Project
                <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;