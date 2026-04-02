"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const reviews = [
  {
    id: 1,
    text: "The precision in their vinyl plank installation is unmatched. Our office space feels completely transformed and modern.",
    author: "Sarah Jenkins",
    role: "Interior Designer, Studio J",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg" // Add your own avatar URLs
  },
  {
    id: 2,
    text: "Professional, clean, and efficient. DSC Strata handled our commercial carpet project with incredible attention to detail.",
    author: "Marcus Chen",
    role: "Project Manager, Nexus Group",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 3,
    text: "Finding eco-friendly flooring that actually looks premium is hard. Strata made the whole sourcing process effortless.",
    author: "Elena Rodriguez",
    role: "Homeowner, Brooklyn",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg"
  }
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1 === reviews.length ? 0 : prev + 1));
  };

  const prevStep = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 < 0 ? reviews.length - 1 : prev - 1));
  };

  // Auto-play feature
  useEffect(() => {
    const timer = setInterval(nextStep, 6000);
    return () => clearInterval(timer);
  }, [index]);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section className="bg-white py-24 px-6 md:px-12 font-poppins overflow-hidden">
      <div className="max-w-[1000px] mx-auto text-center">
        
        {/* Minimal Icon Replacement: Circular Avatar */}
        <div className="flex justify-center mb-10 relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              className="absolute -top-10" // Adjust as needed to overlap or stack
            >
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gray-100 flex items-center justify-center relative z-10">
                <img src={reviews[index].avatar} alt={reviews[index].author} className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Subtle Accent for visual continuity */}
          <div className="w-16 h-16 bg-gray-50 rounded-full opacity-50 absolute -top-8 z-0" />
        </div>

        {/* Carousel Content */}
        <div className="relative h-[280px] md:h-[220px] flex flex-col justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
              }}
              className="absolute inset-0 flex flex-col items-center"
            >
              <p className="text-xl md:text-3xl font-medium text-[#1A1A1A] leading-snug tracking-tight italic">
                "{reviews[index].text}"
              </p>
              
              <div className="mt-8">
                <h4 className="text-[12px] font-black uppercase tracking-[0.3em] text-[#1A1A1A]">
                  {reviews[index].author}
                </h4>
                <p className="text-[10px] uppercase font-bold tracking-[0.1em] text-gray-400 mt-1">
                  {reviews[index].role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation & Progress */}
        <div className="mt-12 flex flex-col items-center gap-8">
          {/* Progress Bar */}
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <motion.div
                key={i}
                className="h-[2px] rounded-full bg-[#A3993D]"
                animate={{ 
                  width: i === index ? 40 : 12,
                  opacity: i === index ? 1 : 0.2
                }}
                transition={{ duration: 0.4 }}
              />
            ))}
          </div>

          {/* Simple Arrows */}
          <div className="flex gap-6">
            <button 
              onClick={prevStep}
              className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors text-gray-400 hover:text-black"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextStep}
              className="p-3 border border-gray-100 rounded-full hover:bg-gray-50 transition-colors text-gray-400 hover:text-black"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialSection;