"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Maximize2 } from 'lucide-react';

// --- 1. PHOTO GALLERY (Editorial Masonry) ---
export const PhotoGallery = ({ onOpen }) => {
  const images = [
    { url: "/images/dummy_dsc.avif", height: "h-[320px] sm:h-[360px] lg:h-[400px]" },
    { url: "/images/dummy_dsc.avif", height: "h-[220px] sm:h-[260px] lg:h-[290px]" },
    { url: "/images/dummy_dsc.avif", height: "h-[340px] sm:h-[390px] lg:h-[430px]" },
    { url: "/images/dummy_dsc.avif", height: "h-[260px] sm:h-[300px] lg:h-[340px]" },
    { url: "/images/dummy_dsc.avif", height: "h-[300px] sm:h-[340px] lg:h-[380px]" },
    { url: "/images/dummy_dsc.avif", height: "h-[240px] sm:h-[280px] lg:h-[320px]" },
    { url: "/images/dummy_dsc.avif", height: "h-[280px] sm:h-[320px] lg:h-[360px]" },
    { url: "/images/dummy_dsc.avif", height: "h-[230px] sm:h-[270px] lg:h-[300px]" },
    { url: "/images/dummy_dsc.avif", height: "h-[260px] sm:h-[300px] lg:h-[340px]" }, 
    { url: "/images/dummy_dsc.avif", height: "h-[260px] sm:h-[300px] lg:h-[340px]" },
    { url: "/images/dummy_dsc.avif", height: "h-[260px] sm:h-[300px] lg:h-[340px]" },
  ];

  return (
    <section className="bg-white px-4 py-20 font-poppins md:px-6 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        {/* Header Area with Right Side Text */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="shrink-0">
            <h2 className="text-4xl font-medium tracking-tight text-black md:text-6xl">
              Visual Portfolio
            </h2>
            <div className="mt-4 h-1 w-16 bg-[#A3993D]" />
          </div>

          <div className="max-w-xl lg:text-right">
            <p className="text-base font-medium leading-relaxed tracking-tight text-gray-600 md:text-lg">
              Explore the <span className="text-[#A3993D]">finer details</span> of our completed projects. From luxury residences to massive sports arenas, each frame captures our commitment to <span className="italic text-gray-400">structural integrity.</span>
            </p>
          </div>
        </div>

        {/* Masonry Layout */}
        <div className="columns-2 gap-3 space-y-3 md:columns-3 md:gap-4 md:space-y-4 lg:columns-5">
          {images.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className={`relative mb-3 break-inside-avoid ${img.height} cursor-pointer overflow-hidden rounded-xl md:rounded-2xl bg-gray-50 shadow-sm group md:mb-4`}
              onClick={() => onOpen('image', img.url)}
            >
              <img
                src={img.url}
                className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                alt="DSC Project"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-all duration-500 group-hover:opacity-100">
                <div className="rounded-full border border-white/20 bg-white/10 p-3 backdrop-blur-[2px] md:p-4">
                  <Maximize2 className="text-white" size={20} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 2. VIDEO GALLERY (Symmetrical 3-Column) ---
export const VideoGallery = ({ onOpen }) => {
  const videos = [
    { title: "Precision Install", thumb: "/images/thumbnail.avif", url: "/videos/sg4.mp4" },
    { title: "Material Strength", thumb: "/images/thumbnail.avif", url: "/videos/sg4.mp4" },
    { title: "Final Finishing", thumb: "/images/thumbnail.avif", url: "/videos/sg4.mp4" },
  ];

  return (
    <section className="py-20 px-6 md:px-12 bg-white font-poppins">
      <div className="mx-auto max-w-[1440px]">
        {/* Header Area with Right Side Text */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="shrink-0">
            <h2 className="text-4xl font-medium tracking-tight text-black md:text-6xl">
              Process In Motion
            </h2>
            <div className="w-16 h-1 bg-[#A3993D] mt-4" />
          </div>

          <div className="max-w-xl lg:text-right">
            <p className="text-base font-medium leading-relaxed tracking-tight text-gray-600 md:text-lg">
              Witness the <span className="text-[#A3993D]">mechanical precision</span> of our team. We don't just show the result; we show the grit, the engineering, and the <span className="italic text-gray-400">mastery of the machine.</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 md:gap-6">
          {videos.map((vid, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="group relative aspect-[1.4/1] rounded-2xl overflow-hidden cursor-pointer shadow-sm bg-gray-100"
              onClick={() => onOpen('video', vid.url)}
            >
              <img src={vid.thumb} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={vid.title} loading="lazy" />
              
              <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center transition-all group-hover:bg-black/10">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 group-hover:bg-[#A3993D] group-hover:border-[#A3993D] group-hover:scale-110 transition-all duration-300">
                  <Play fill="white" className="text-white ml-0.5" size={18} />
                </div>
              </div>

              <div className="absolute bottom-4 left-5">
                <h3 className="text-white text-[10px] font-black uppercase tracking-[0.2em] drop-shadow-md">
                  {vid.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- 3. MEDIA POPUP (MODAL) ---
export const MediaModal = ({ isOpen, onClose, type, url }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-md"
          onClick={onClose}
        >
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[110]"
            onClick={onClose}
          >
            <X size={36} strokeWidth={1.5} />
          </button>

          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative w-full max-w-6xl aspect-video rounded-xl overflow-hidden shadow-2xl bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {type === 'image' ? (
              <img src={url} className="w-full h-full object-contain" alt="Gallery View" />
            ) : (
              <iframe 
                src={`${url}?autoplay=1`} 
                className="w-full h-full border-none" 
                allow="autoplay; encrypted-media" 
                allowFullScreen
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};