"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ["All", "Sheet Vinyl", "Vinyl Plank", "Carpet Tiles", "Commercial Carpets"];

const projects = [
  { id: 1, title: "Ohio Construction Office", category: "Commercial Carpets", image: "/images/dummy_dsc.avif" },
  { id: 2, title: "234 Avenue Road", category: "Vinyl Plank", image: "/images/dummy_dsc.avif" },
  { id: 3, title: "City Library, Main Street", category: "Sheet Vinyl", image: "/images/dummy_dsc.avif" },
  { id: 4, title: "Parkside Retirement Home", category: "Carpet Tiles", image: "/images/dummy_dsc.avif" },
  { id: 5, title: "XI - Xian Group", category: "Vinyl Plank", image: "/images/dummy_dsc.avif" },
  { id: 6, title: "Acme - Acme Corporation", category: "Commercial Carpets", image: "/images/dummy_dsc.avif" },
];

const Project = () => {
  const [filter, setFilter] = useState("All");

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <section className="bg-[#f5f5f3] px-4 py-8 font-poppins md:px-6 md:py-10">
      <div className="mx-auto max-w-[1440px]">
        {/* Editorial Hero */}
        <div className="mb-16 md:mb-20">
          <div className="mb-8 md:mb-10">
            <h1 className="mt-32 max-w-[12ch] text-[2.7rem] font-medium leading-[0.96] tracking-[-0.06em] text-black sm:text-[3.8rem] md:text-[5rem] lg:text-[6.2rem]">
            Surfaces that Define Modern Spaces.
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[16/8] w-full overflow-hidden rounded-[1.25rem] bg-gray-200 md:rounded-[1.5rem] lg:aspect-[16/7.5]"
          >
            <motion.img
              initial={{ scale: 1.04 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              src="/images/project_dsc.avif"
              alt="Featured project hero"
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>

        {/* Header */}
        <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row">
          <div>
            <h2 className="flex items-baseline gap-2 text-4xl font-bold tracking-tight text-[#1A2E2E]">
              FEATURED PROJECTS
              <span className="text-sm font-medium text-gray-400">12</span>
            </h2>
          </div>

          <div className="max-w-xl">
            <p className="text-sm leading-relaxed text-gray-500">
              Our featured projects showcase a variety of flooring options, each with its unique benefits and aesthetic appeal.
              We pride ourselves on delivering high-quality, durable, and stylish flooring solutions.
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="flex flex-wrap gap-8 text-[11px] font-bold uppercase tracking-widest text-gray-400">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`transition-colors hover:text-black ${
                  filter === cat ? 'border-b-2 border-black pb-1 text-black' : ''
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
            View: <span className="cursor-pointer text-black">Grid</span> |{" "}
            <span className="cursor-pointer hover:text-black">List</span>
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 20 }}
                transition={{ duration: 0.4 }}
                className="group cursor-pointer"
              >
                <div className="mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow-sm">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <h3 className="text-[12px] font-black uppercase tracking-[0.15em] text-[#1A2E2E]">
                  {project.title}
                </h3>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More */}
        <div className="mt-20 flex justify-center">
          <button className="border border-gray-200 px-10 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-black hover:text-white">
            Show More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Project;