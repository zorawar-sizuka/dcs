"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Search, X, Calendar, User, Clock } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Collaboration for Climate Action",
    excerpt: "Why teamwork is the foundation of lasting environmental change and sustainable material sourcing.",
    content: "Full detailed article content goes here. In the modern era of premium hardwood sourcing, collaboration isn't just a buzzword; it's a structural requirement. We work with foresters and tech innovators to ensure every plank laid contributes to a greener footprint...",
    image: "/images/dummy_dsc.avif",
    category: "Sustainability",
    bgColor: "bg-[#E8F5E9]", // Light Green (Permanent)
    accent: "text-green-700"
  },
  {
    id: 2,
    title: "From Trees to Technology",
    excerpt: "Exploring how innovation drives sustainability in the modern world of premium hardwood.",
    content: "From LiDAR scanning of forests to precision CNC milling, technology has transformed the flooring industry. Our latest research shows that smart-cutting reduces waste by 40%, ensuring that we respect the material from the moment it leaves the earth...",
    image: "/images/dummy_dsc.avif",
    category: "Innovation",
    bgColor: "bg-[#E3F2FD]", // Light Blue (Permanent)
    accent: "text-blue-700"
  },
  {
    id: 3,
    title: "Starting and Growing a Career",
    excerpt: "Web design blends creativity and tech, offering strong demand, solid pay, and roles in interior design.",
    content: "The intersection of digital design and physical interiors is closer than ever. Architects and interior designers are now using real-time rendering to simulate wood grain performance under specific lighting conditions, creating a new career path for 'Digital Interior Specialists'...",
    image: "/images/dummy_dsc.avif",
    category: "Culture",
    bgColor: "bg-[#FEF9E7]", // Light Gold (Permanent)
    accent: "text-[#A3993D]"
  }
];

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <div className="bg-white pb-24 font-poppins text-black">
      
      {/* --- BLOG HERO: BALANCED TALL HEIGHT --- */}
      <section className="relative">
        <div className="relative h-[70vh] min-h-[550px] w-full overflow-hidden bg-black md:h-[75vh]">
          <motion.div
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('/images/blog_dsc.jpg')" }}
            />
          </motion.div>

          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-black/18" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 pb-10 md:px-10 md:pb-14 lg:px-16 lg:pb-16 xl:px-20">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[920px]"
              >
                <span className="mb-5 inline-block text-[10px] font-bold uppercase tracking-[0.34em] text-white/72 md:mb-6">
                  Journal • Insight • Craft
                </span>

                <h1 className="max-w-[11ch] text-[2.8rem] font-light leading-[0.95] tracking-[-0.055em] text-white sm:text-[4rem] md:text-[5.4rem] lg:text-[6.4rem] xl:text-[7rem]">
                  Welcome to <span className="block font-semibold text-white">DCS Journal</span>
                </h1>

                <p className="mt-5 max-w-[640px] text-[15px] leading-relaxed text-white/78 sm:text-base md:mt-6 md:text-lg">
                  Insights into premium craftsmanship and sustainable design.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BLOG GRID --- */}
      <section className="mx-auto mt-24 max-w-[1440px] px-6 md:px-12">
        <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr] md:items-end">
          <h2 className="max-w-[12ch] text-5xl font-bold tracking-tight leading-[1.1] md:text-7xl">
            Latest from the Journal
          </h2>
          <div className="flex flex-col gap-6 md:max-w-[520px] md:ml-auto">
            <div className="relative group">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full border-b border-gray-200 bg-gray-50 px-2 py-4 font-medium outline-none transition-all focus:border-black"
              />
              <Search className="absolute right-2 top-4 text-gray-400 transition-colors group-hover:text-black" size={20} />
            </div>
          </div>
        </div>

        {/* --- BLOG CARDS: PERMANENT COLOR MODE --- */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedPost(post)}
              className={`group flex h-full cursor-pointer flex-col p-6 rounded-[3rem] transition-all duration-500 border border-black/5 ${post.bgColor} hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="mb-8 aspect-[1.4/1] overflow-hidden rounded-[2.5rem] shadow-sm">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-grow flex-col px-2">
                <span className={`mb-4 text-[10px] font-black uppercase tracking-[0.3em] ${post.accent}`}>
                  {post.category}
                </span>
                <h3 className="mb-4 text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-black md:text-3xl">
                  {post.title}
                </h3>
                <p className="mb-6 line-clamp-3 text-[15px] leading-relaxed text-gray-600">
                  {post.excerpt}
                </p>

                <div className="mt-auto">
                  <button className="flex items-center gap-2 text-sm font-bold transition-all duration-300 group-hover:gap-4">
                    Read Article <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- MODAL OVERLAY --- */}
      <AnimatePresence>
        {selectedPost && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPost(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md" 
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-[900px] max-h-[85vh] overflow-y-auto bg-white rounded-[3rem] shadow-2xl no-scrollbar"
            >
              {/* Sticky Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-white/80 backdrop-blur-md">
                <span className={`text-[10px] font-black uppercase tracking-widest ${selectedPost.accent}`}>
                  {selectedPost.category}
                </span>
                <button 
                  onClick={() => setSelectedPost(null)}
                  className="p-3 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="px-8 pb-12 md:px-16">
                <img 
                  src={selectedPost.image} 
                  className="w-full h-[300px] md:h-[450px] object-cover rounded-[2.5rem] mb-10"
                  alt={selectedPost.title}
                />
                
                <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 leading-tight">
                  {selectedPost.title}
                </h2>

                <div className="flex flex-wrap gap-6 mb-10 pb-8 border-b border-slate-100">
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <User size={14} /> DCS Editorial
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <Calendar size={14} /> April 2026
                  </div>
                  <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                    <Clock size={14} /> 5 Min Read
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-xl font-medium text-slate-600 leading-relaxed mb-6 italic">
                    {selectedPost.excerpt}
                  </p>
                  <p className="text-slate-800 leading-relaxed text-lg whitespace-pre-line">
                    {selectedPost.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogPage;