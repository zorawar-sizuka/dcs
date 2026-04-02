"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, ArrowUpRight, Send, ChevronDown } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-white pb-24 font-poppins text-black">
      
      {/* --- CONTACT HERO: ORIGINAL STYLE WITH REDUCED HEIGHT --- */}
      <section className="relative">
        {/* Height reduced to 60vh-65vh for a tighter look */}
      {/* Change h-[60vh] to h-[70vh] and increase min-h to 550px */}
<div className="relative h-[70vh] min-h-[550px] w-full overflow-hidden bg-black md:h-[75vh]">
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
                backgroundImage: "url('/images/contact_dsc.jpg')",
              }}
            />
          </motion.div>

          {/* Cinematic overlay (Keep your original overlays) */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-black/18" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-transparent to-transparent" />

          {/* Hero Content (Your exact original layout/styles) */}
          <div className="absolute inset-0 flex items-end">
            <div className="w-full px-6 pb-10 md:px-10 md:pb-14 lg:px-16 lg:pb-16 xl:px-20">
              <motion.div
                initial={{ opacity: 0, y: 26 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-[960px]"
              >
                <span className="mb-5 inline-block text-[10px] font-bold uppercase tracking-[0.34em] text-white/72 md:mb-6">
                  Get in Touch
                </span>

                <h1 className="max-w-[12ch] text-[2.8rem] font-light leading-[0.95] tracking-[-0.055em] text-white sm:text-[4rem] md:text-[5.4rem] lg:text-[6.4rem] xl:text-[7rem]">
                  Let's Build Your
                  <span className="block font-semibold text-gray-200">
                    Dream Space.
                  </span>
                </h1>

                <div className="mt-6 flex max-w-[720px] flex-col gap-5 md:mt-7 md:flex-row md:items-start md:gap-6">
                  <p className="max-w-[460px] text-[15px] font-medium leading-relaxed text-white/78 sm:text-base md:text-lg">
                    Residential consultations, commercial projects, material sourcing, and general inquiries.
                  </p>

                  <div className="hidden h-12 w-[1px] bg-white/18 md:block" />

                  <a
                    href="#inquiry"
                    className="group inline-flex w-fit items-center gap-2.5 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-black transition-all duration-300 hover:scale-[1.02]"
                  >
                    Send a Message
                    <ArrowUpRight
                      size={17}
                      className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SPLIT-PANE SECTION: NEW LIGHT THEMED CARDS --- */}
      <section id="inquiry" className="mx-auto mt-24 max-w-[1440px] px-6 md:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
          
          {/* LEFT: FORM (Updated with light accents) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-[60%] lg:pr-12"
          >
            <h2 className="mb-12 text-4xl font-bold tracking-tight">
              Project Inquiry
            </h2>

            <form className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
              <div className="space-y-2">
                <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full rounded-xl border-none bg-[#e9f4e9] p-5 font-medium outline-none ring-1 ring-gray-100 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-[#A3993D] focus:bg-white"
                />
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@dscstrata.com"
                  className="w-full rounded-xl border-none bg-[#e9f4e9] p-5 font-medium outline-none ring-1 ring-gray-100 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-[#A3993D] focus:bg-white"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Subject
                </label>
                <div className="relative">
                  <select className="w-full appearance-none rounded-xl border-none bg-[#e9f4e9] p-5 font-medium outline-none ring-1 ring-gray-100 transition-all focus:ring-2 focus:ring-[#A3993D] focus:bg-white">
                    <option>Select product type</option>
                    <option>Residential Flooring</option>
                    <option>Commercial Projects</option>
                    <option>Material Sourcing</option>
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Message
                </label>
                <textarea
                  rows="6"
                  placeholder="Tell us about your project or general inquiry..."
                  className="w-full resize-none rounded-xl border-none bg-[#e9f4e9] p-5 font-medium outline-none ring-1 ring-gray-100 transition-all placeholder:text-gray-400 focus:ring-2 focus:ring-[#A3993D] focus:bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <button className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-black py-6 font-bold text-white transition-all hover:bg-[#A3993D] shadow-lg hover:shadow-[#A3993D]/20">
                  Submit Inquiry
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </form>
          </motion.div>

          {/* RIGHT: LIGHT DETAILS + MAP (Removed Dark BG) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex w-full flex-col gap-6 lg:w-[40%]"
          >
            {/* Info Card - Light Blue Feel */}
            <div className="flex flex-col gap-10 rounded-[2.5rem] bg-[#E3F2FD] p-10 border border-blue-100">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 rounded-2xl bg-white p-4 text-blue-600 shadow-sm">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 tracking-tight">Visit our Showroom</h4>
                    <p className="mt-1 text-slate-600 font-medium leading-relaxed">
                    1 Sahid Basu Smriti Marga, <br />Kirtipur 44618 
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 rounded-2xl bg-white p-4 text-green-600 shadow-sm">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 tracking-tight">Phone Number</h4>
                    <p className="mt-1 text-slate-600 font-medium leading-relaxed">+977 9851100165</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 rounded-2xl bg-white p-4 text-[#A3993D] shadow-sm">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 tracking-tight">Email</h4>
                    <p className="mt-1 text-slate-600 font-medium leading-relaxed">hello@dscstrata.com</p>
                  </div>
                </div>
            </div>

            {/* Map Area - Light Green Feel */}
            <div className="relative flex-grow min-h-[350px] overflow-hidden rounded-[2.5rem] border-8 border-[#E8F5E9] bg-slate-50 group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.3768147137535!2d85.28189617616654!3d27.674711327116812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19478f7e716d%3A0x6338e3a893113566!2sDSC%20Strata!5e0!3m2!1sen!2snp!4v1712076000000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                className="absolute inset-0 border-0 grayscale opacity-80 hover:grayscale-0 transition-all duration-700"
                allowFullScreen=""
                loading="lazy"
              ></iframe>

              <div className="absolute bottom-8 left-8 rounded-2xl bg-white/90 px-6 py-3 shadow-xl backdrop-blur-md border border-white">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#A3993D]">Headquarters</p>
                <p className="text-sm font-bold text-slate-800">Kirtipur 44618, Kathmandu</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;