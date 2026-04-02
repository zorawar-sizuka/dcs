"use client";
import React from 'react';
import { motion } from 'framer-motion';

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
    <section className="bg-white px-4 py-20 md:px-6 md:py-24 ">
      <div className="w-full my-6">
        {/* Header Area */}
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="shrink-0">
            <h2 className="text-4xl font-medium tracking-wide text-black md:text-6xl">
              Flooring Materials
            </h2>  
            <div className="mt-4 h-1 w-16 bg-[#A3993D]" />
          </div>

          <div className="max-w-xl md:ml-auto my-8">
            <p className=" font-medium tracking-tighter text-gray-600 md:text-lg lg:text-xl">
              Our legacy dates   <span className="text-[#A3993D] font-medium"> back more than 150 years,</span> b when our founder made a simple
              but significant statement:{" "}
              <span className="italic text-gray-400">
                "Let the buyer have faith."
              </span>
            </p>
          </div>
        </div>

        {/* Materials Grid */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {materials.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[240px] sm:h-[320px] lg:h-[420px] cursor-pointer overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-110">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

              <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                <span className="block translate-y-[-10px] text-sm sm:text-lg font-bold text-white opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.id}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 text-white sm:bottom-6 sm:left-6">
                <h3 className="mb-0.5 text-base sm:text-lg lg:text-xl font-bold tracking-tight">
                  {item.name}
                </h3>
                <p className="translate-y-2 text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-gray-300 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;