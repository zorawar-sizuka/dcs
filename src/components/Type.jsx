"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Drill, Settings } from 'lucide-react';

const services = [
  {
    title: "Installations",
    description: "Expert precision in laying sheet vinyl, vinyl planks, and commercial carpets. We ensure a seamless foundation for your space.",
    icon: <Layers size={40} strokeWidth={1.5} />,
  },
  {
    title: "Repairs",
    description: "Restoring the integrity of your floors with specialized techniques for damage control, joint sealing, and plank replacement.",
    icon: <Drill size={40} strokeWidth={1.5} />,
  },
  {
    title: "Maintenance",
    description: "Proactive care programs designed to extend the lifespan of your flooring, keeping aesthetics and safety at peak performance.",
    icon: <Settings size={40} strokeWidth={1.5} />,
  }
];

const TypeSection = () => {
  return (
    <section className="bg-white px-4 py-20 font-poppins md:px-12 md:py-24">
      <div className="mx-auto max-w-[1440px]">

        {/* Header */}
        <div className="mb-16 md:mb-20 text-center"> 
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-light tracking-wide text-black"
          >
            Services
          </motion.h2>
     
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl font-medium tracking-tighter text-gray-600 text-sm md:text-lg lg:text-xl mt-4"
          >
            From heritage restoration to modern commercial fit-outs, we provide a 
            comprehensive suite of flooring services. Our approach combines 
            <span className="text-[#A3993D] font-medium"> sustainable sourcing </span> 
            with artisan-level technical skill.
          </motion.p>
        </div>

        {/* Grid - Set to 3 columns across all screen sizes with a gap on mobile */}
        <div className="grid grid-cols-3 gap-2 md:gap-0 border-y border-gray-100">
          {services.map((service, index) => {
            const isFirst = index === 0;
            const isGreen = index % 2 === 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group flex flex-col items-center text-center p-4 py-8 md:p-16 transition-all duration-500 rounded-xl md:rounded-none
                ${
                  isGreen
                    ? isFirst
                      ? 'bg-[#03c326]/[0.10]'
                      : 'bg-[#03c326]/[0.04] md:hover:bg-[#03c326]/[0.08]'
                    : 'bg-[#003dba]/[0.035] md:hover:bg-[#003dba]/[0.07]'
                }
                ${index !== services.length - 1 ? 'md:border-r border-gray-100' : ''}
                `}
              >
                {/* Icon - Smaller on mobile */}
                <div
                  className={`mb-4 md:mb-8 transition-all duration-500
                  ${isGreen ? 'text-[#03c326]' : 'text-[#003dba]'}
                  ${isFirst ? 'scale-110' : 'group-hover:scale-110'}
                  `}
                >
                  {/* Customizing size for mobile vs desktop */}
                  <div className="md:hidden">
                    {React.cloneElement(service.icon, { size: 28 })}
                  </div>
                  <div className="hidden md:block">
                    {service.icon}
                  </div>
                </div>

                {/* Title - Scaled for mobile */}
                <h3 className="text-xs md:text-2xl font-bold mb-0 md:mb-4 tracking-tight text-[#1A1A1A]">
                  {service.title}
                </h3>

                {/* Description - Hidden on Mobile */}
                <p
                  className={`hidden md:block max-w-xs text-sm leading-relaxed transition-colors duration-500
                  ${isFirst ? 'text-gray-800' : 'text-gray-600 group-hover:text-gray-800'}`}
                >
                  {service.description}
                </p>

                {/* Bottom line - Hidden on Mobile for cleaner look */}
                <div
                  className={`hidden md:block mt-8 h-[1px] transition-all duration-500
                  ${isGreen ? 'bg-[#03c326]' : 'bg-[#003dba]'}
                  ${isFirst ? 'w-12' : 'w-0 group-hover:w-12'}
                  `}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TypeSection;