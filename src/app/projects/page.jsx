"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = ["All", "Sheet Vinyl", "Vinyl Plank", "Carpet Tiles", "Commercial Carpets"];

const Project = () => {
  const [filter, setFilter] = useState("All");
  const [view, setView] = useState("grid"); // "grid" or "list"
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch projects", err);
        setLoading(false);
      });
  }, []);

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
              <span className="text-sm font-medium text-gray-400">{loading ? '-' : projects.length}</span>
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

          <div className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex gap-2 items-center">
            View: 
            <button 
              onClick={() => setView('grid')} 
              className={`transition-colors ${view === 'grid' ? 'text-black' : 'hover:text-black hover:opacity-80'}`}
            >
              Grid
            </button> 
            |{" "}
            <button 
              onClick={() => setView('list')} 
              className={`transition-colors ${view === 'list' ? 'text-black' : 'hover:text-black hover:opacity-80'}`}
            >
              List
            </button>
          </div>
        </div>

        {/* Projects View */}
        {loading ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="mb-4 aspect-[4/3] rounded-xl bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-sm font-bold text-gray-400">No projects found for this category.</p>
          </div>
        ) : view === "grid" ? (
          // GRID VIEW
          <motion.div layout className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
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
                  <div className="mb-4 aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 shadow-sm relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md text-[9px] font-black uppercase tracking-widest text-black/70">
                      {project.category}
                    </div>
                  </div>
                  <h3 className="text-[12px] font-black uppercase tracking-[0.15em] text-[#1A2E2E]">
                    {project.title}
                  </h3>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          // LIST VIEW
          <motion.div layout className="flex flex-col gap-6">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="group cursor-pointer flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-full sm:w-1/3 md:w-1/4 aspect-video sm:aspect-[4/3] overflow-hidden rounded-xl bg-gray-100 flex-shrink-0 relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-center sm:pr-8 w-full">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A3993D] mb-2">
                       {project.category}
                    </p>
                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-[#1A2E2E] mb-3 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

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