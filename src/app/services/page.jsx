"use client";
import React from "react";
import { motion } from "framer-motion"; 
import dynamic from "next/dynamic";
import {
  Layers3,
  Hammer,
  ShieldCheck,
  Building2,
  Home,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
const Lottie = dynamic(() => import("lottie-react"), {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] bg-[linear-gradient(135deg,rgba(3,195,38,0.05),rgba(0,61,186,0.05),rgba(163,153,61,0.07))]" />
    ),
  });
import servicesAnimation from "../../../public/lottie/services.json"; 
// replace with your actual lottie file

const serviceCards = [
  {
    title: "Installation",
    description:
      "Precision laying of hardwood, sheet vinyl, vinyl plank, carpet tiles, and commercial carpet systems.",
    icon: <Layers3 size={28} strokeWidth={1.7} />,
    tone: "green",
    points: ["Residential floors", "Commercial spaces", "Seamless finish"],
  },
  {
    title: "Repair & Restoration",
    description:
      "Targeted repair work, replacement of damaged sections, edge correction, refinishing support, and surface recovery.",
    icon: <Hammer size={28} strokeWidth={1.7} />,
    tone: "blue",
    points: ["Damage correction", "Section replacement", "Finish recovery"],
  },
  {
    title: "Maintenance",
    description:
      "Long-term care plans that protect performance, extend product life, and preserve the visual quality of your flooring.",
    icon: <ShieldCheck size={28} strokeWidth={1.7} />,
    tone: "yellow",
    points: ["Lifecycle support", "Surface care", "Ongoing upkeep"],
  },
];

const processSteps = [
  {
    no: "01",
    title: "Consultation",
    text: "We understand your space, usage, style direction, and practical requirements.",
  },
  {
    no: "02",
    title: "Material Selection",
    text: "We guide you toward the right flooring system based on durability, budget, and visual finish.",
  },
  {
    no: "03",
    title: "Site Preparation",
    text: "We assess the subfloor, resolve inconsistencies, and prepare the surface for accurate installation.",
  },
  {
    no: "04",
    title: "Installation & Finishing",
    text: "We execute with precision, detail, and clean finishing for a premium final result.",
  },
];

const useCases = [
  "Homes",
  "Apartments",
  "Retail Spaces",
  "Corporate Offices",
  "Hospitality",
  "Showrooms",
  "Healthcare",
  "Commercial Interiors",
];

const materials = [
  "Hardwood",
  "Sheet Vinyl",
  "Vinyl Plank",
  "Natural Stone",
  "Carpet Tiles",
  "Commercial Carpet",
  "Underlay Systems",
  "Restoration Finishes",
];

const toneMap = {
  green: {
    bg: "bg-[#03c326]/[0.05]",
    border: "border-[#03c326]/10",
    icon: "text-[#03c326]/85",
    line: "bg-[#03c326]/75",
  },
  blue: {
    bg: "bg-[#003dba]/[0.05]",
    border: "border-[#003dba]/10",
    icon: "text-[#003dba]/80",
    line: "bg-[#003dba]/70",
  },
  yellow: {
    bg: "bg-[#A3993D]/[0.08]",
    border: "border-[#A3993D]/12",
    icon: "text-[#8b8133]",
    line: "bg-[#A3993D]",
  },
};

const ServicesInfographicSection = () => {
  return (
    <section className="bg-white px-4 pb-20 pt-28 font-poppins md:px-6 md:pb-24 md:pt-32 lg:pt-36">
      <div className="mx-auto max-w-[1440px]">
        {/* Top Services label */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center md:mb-10"
        >
          <span className="text-[2.4rem] font-medium leading-[0.98] tracking-[-0.055em] text-[#111111] sm:text-[3.1rem] md:text-[4.3rem]">
            Services
          </span>
        </motion.div>

        {/* Lottie block */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 overflow-hidden px-4 py-6 md:mb-20 md:px-6 md:py-8"
        >
          <div className="mx-auto flex h-[260px] w-full max-w-[900px] items-center justify-center sm:h-[320px] md:h-[420px] lg:h-[500px]">
            {/* Replace this placeholder with your lottie */}
            <Lottie animationData={servicesAnimation} loop={true} className="h-full w-full" />
         
          </div>
        </motion.div>

        {/* Top intro */}
        <div className="grid grid-cols-1 gap-8 border-b border-black/6 pb-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-5 inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400"
            >
              Services Overview
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, duration: 0.6 }}
              className="text-[2.4rem] font-medium leading-[0.98] tracking-[-0.055em] text-[#111111] sm:text-[3.1rem] md:text-[4.3rem]"
            >
              <span className="block">Flooring systems</span>
              <span className="block">clearly</span>
              <span className="block">explained.</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="max-w-[700px] text-[15px] leading-relaxed text-gray-600 md:ml-auto md:text-[17px]"
          >
            We provide installation, repair, restoration, and maintenance for
            premium flooring systems across residential and commercial spaces.
            Our approach combines material knowledge, practical performance, and
            clean execution — so every surface works as beautifully as it looks.
          </motion.p>
        </div>

        {/* Service cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {serviceCards.map((service, index) => {
            const tone = toneMap[service.tone];

            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.55 }}
                className={`rounded-[1.75rem] border p-6 md:p-7 ${tone.bg} ${tone.border}`}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className={`rounded-2xl border border-black/5 bg-white/70 p-3 ${tone.icon}`}>
                    {service.icon}
                  </div>
                  <div className={`h-[2px] w-12 ${tone.line}`} />
                </div>

                <h3 className="mb-3 text-[1.55rem] font-semibold tracking-[-0.04em] text-[#111111]">
                  {service.title}
                </h3>

                <p className="mb-6 text-[15px] leading-relaxed text-gray-600">
                  {service.description}
                </p>

                <div className="space-y-3">
                  {service.points.map((point) => (
                    <div
                      key={point}
                      className="flex items-center gap-3 text-sm text-[#111111]/85"
                    >
                      <CheckCircle2 size={16} className={tone.icon} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Middle infographic zone */}
        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Process */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="rounded-[2rem] border border-black/6 bg-[#f8f8f6] p-6 md:p-8"
          >
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-[1.6rem] font-semibold tracking-[-0.04em] text-[#111111]">
                Our Process
              </h3>
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-400">
                Step by step
              </span>
            </div>

            <div className="space-y-5">
              {processSteps.map((step, index) => (
                <div
                  key={step.no}
                  className={`grid grid-cols-[56px_1fr] gap-4 pb-5 ${
                    index !== processSteps.length - 1
                      ? "border-b border-black/6"
                      : ""
                  }`}
                >
                  <div className="text-[1.15rem] font-semibold tracking-[-0.03em] text-[#143847]">
                    {step.no}
                  </div>
                  <div>
                    <h4 className="mb-1.5 text-[1.05rem] font-semibold text-[#111111]">
                      {step.title}
                    </h4>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right side info blocks */}
          <div className="grid grid-cols-1 gap-5">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.04, duration: 0.55 }}
              className="rounded-[2rem] border border-black/6 bg-white p-6 md:p-7"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full bg-[#003dba]/[0.06] p-2 text-[#003dba]/80">
                  <Building2 size={18} />
                </div>
                <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[#111111]">
                  Where We Work
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {useCases.map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03, duration: 0.4 }}
                    className="rounded-full border border-[#003dba]/10 bg-[#003dba]/[0.045] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#003dba]/75"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08, duration: 0.55 }}
              className="rounded-[2rem] border border-black/6 bg-white p-6 md:p-7"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-full bg-[#03c326]/[0.06] p-2 text-[#03c326]/85">
                  <Home size={18} />
                </div>
                <h3 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-[#111111]">
                  Material Systems
                </h3>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {materials.map((item, index) => (
                  <motion.span
                    key={item}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03, duration: 0.4 }}
                    className="rounded-full border border-[#03c326]/10 bg-[#03c326]/[0.045] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#03c326]/82"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom stats strip */}
        <div className="mt-14 grid grid-cols-2 gap-y-10 border-t border-black/6 pt-10 md:grid-cols-4 md:gap-y-0">
          {[
            { value: "25+", label: "Years of Craft" },
            { value: "500+", label: "Projects Delivered" },
            { value: "12+", label: "Material Categories" },
            { value: "100%", label: "Execution Focus" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.5 }}
              className={`flex flex-col items-center justify-center text-center ${
                index !== 3 ? "md:border-r md:border-black/6" : ""
              }`}
            >
              <div className="text-[2.2rem] font-medium leading-none tracking-[-0.05em] text-[#143847] md:text-[2.7rem]">
                {stat.value}
              </div>
              <p className="mt-4 text-sm text-[#143847]/72">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <button className="group inline-flex items-center gap-3 rounded-full bg-[#111111] px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-[#A3993D]">
            Talk About Your Project
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesInfographicSection;