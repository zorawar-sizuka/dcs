"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const materials = [
  {
    id: "01.",
    name: "Hardwood",
    category: "Flooring",
    image: "/services/service1.jpeg",
  },
  {
    id: "02.",
    name: "Natural Stone",
    category: "Flooring",
    image: "/services/service2.jpeg",
  },
  {
    id: "03.",
    name: "Laminate",
    category: "Flooring",
    image: "/services/service3.jpeg",
  },
  {
    id: "04.",
    name: "Carpet",
    category: "Flooring",
    image: "/services/service4.jpeg",
  },
];

const ServicesSection = () => {
  return (
    <section className="bg-white px-4 py-20 md:px-6 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1440px]">
        
        {/* Header Area */}
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-medium tracking-tight text-black md:text-6xl">
                Flooring Materials
              </h2>  
              <div className="mt-4 h-1 w-16 bg-[#A3993D]" />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-xl"
          >
            <p className="text-base font-medium leading-relaxed tracking-tight text-gray-600 md:text-lg">
              Our legacy dates <span className="text-[#A3993D]">back more than 150 years.</span> We operate on a simple but significant architectural principle:{" "}
              <span className="italic text-gray-400">
                "Precision in material, faith in craft."
              </span>
            </p>
          </motion.div>
        </div>

        {/* Materials Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
          {materials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.6, 
                ease: [0.21, 0.45, 0.32, 0.9] 
              }}
              className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-xl bg-gray-100 shadow-sm"
            >
              {/* GPU Accelerated Image Container */}
              <div className="absolute inset-0 will-change-transform transition-transform duration-[1s] ease-out group-hover:scale-110">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                  loading="lazy"
                  quality={75} 
                />
              </div>

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

              {/* Content Overlay */}
              <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-between">
                <span className="text-sm md:text-xl font-bold text-white/40 transition-colors duration-500 group-hover:text-[#A3993D]">
                  {item.id}
                </span>

                <div>
                  <h3 className="text-base md:text-2xl font-bold tracking-tight text-white mb-1">
                    {item.name}
                  </h3>
                  <div className="overflow-hidden">
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-[#A3993D] translate-y-full transition-transform duration-500 group-hover:translate-y-0">
                      Explore Series
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;