"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Search } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "Collaboration for Climate Action",
    excerpt: "Why teamwork is the foundation of lasting environmental change and sustainable material sourcing.",
    image: "/images/dummy_dsc.avif",
    category: "Sustainability"
  },
  {
    id: 2,
    title: "From Trees to Technology",
    excerpt: "Exploring how innovation drives sustainability in the modern world of premium hardwood.",
    image: "/images/dummy_dsc.avif",
    category: "Innovation"
  },
  {
    id: 3,
    title: "Starting and Growing a Career",
    excerpt: "Web design blends creativity and tech, offering strong demand, solid pay, and roles in interior design.",
    image: "/images/dummy_dsc.avif",
    category: "Culture"
  }
];

const BlogPage = () => {
  return (
    <div className="bg-white pb-24 font-poppins text-black">
      
      {/* --- BLOG HERO: FULL-BLEED EDITORIAL STYLE --- */}
      <section className="relative">
        <div className="relative h-[82vh] min-h-[560px] w-full overflow-hidden bg-black md:h-[88vh] md:min-h-[680px]">
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('/images/blog_dsc.jpg')",
              }}
            />
          </motion.div>

          {/* Dark cinematic overlay */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-black/18" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-transparent to-transparent" />

          {/* Content */}
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
                  Welcome to
                  <span className="block font-semibold text-white">
                    DCS Journal
                  </span>
                </h1>

                <p className="mt-5 max-w-[640px] text-[15px] leading-relaxed text-white/78 sm:text-base md:mt-6 md:text-lg">
                  Insights into premium craftsmanship and sustainable design.
                </p>

                <div className="mt-7 flex flex-wrap items-center gap-4 md:mt-8 md:gap-5">
                  <button className="group inline-flex items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:scale-[1.02]">
                    Subscribe for updates
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>

                  <div className="hidden h-10 w-[1px] bg-white/18 md:block" />

                  <span className="text-sm font-medium text-white/62">
                    Articles, ideas, and design thinking from Strata.
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- BLOG GRID --- */}
      <section className="mx-auto mt-24 max-w-[1440px] px-6 md:px-12">
      <div className="mb-20 grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr] md:items-end">

{/* LEFT: Heading */}
<h2 className="max-w-[12ch] text-5xl font-bold tracking-tight leading-[1.1] md:text-7xl">
  Latest from the  Journal
</h2>

{/* RIGHT: Paragraph + Search */}
<div className="flex flex-col gap-6 md:max-w-[520px] md:ml-auto">
  
  <p className="text-lg leading-relaxed text-gray-500 md:text-xl">
    Stay informed with expert articles, case studies, and practical guides on restoring ecosystems,
    measuring impact, and scaling community-led projects.
  </p>

  <div className="relative group">
    <input
      type="text"
      placeholder="Search articles..."
      className="w-full border-b border-gray-200 bg-gray-50 px-2 py-4 font-medium outline-none transition-all focus:border-black"
    />
    <Search
      className="absolute right-2 top-4 text-gray-400 transition-colors group-hover:text-black"
      size={20}
    />
  </div>

</div>

</div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group flex h-full flex-col"
            >
              <div className="mb-8 aspect-[1.4/1] overflow-hidden rounded-[2.5rem] shadow-sm">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-grow flex-col">
                <span className="mb-4 text-[10px] font-black uppercase tracking-[0.3em] text-[#A3993D]">
                  {post.category}
                </span>
                <h3 className="mb-4 text-2xl font-bold leading-tight tracking-tight transition-colors group-hover:text-[#A3993D] md:text-3xl">
                  {post.title}
                </h3>
                <p className="mb-6 line-clamp-3 text-[15px] leading-relaxed text-gray-500">
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

        <div className="mt-24 flex justify-end border-t border-gray-100 pt-12">
          <button className="flex items-center gap-4 rounded-2xl bg-black px-10 py-5 font-bold text-white shadow-2xl shadow-black/10 transition-all hover:bg-gray-800">
            View all articles <ArrowRight size={20} />
          </button>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;