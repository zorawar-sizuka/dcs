"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="bg-white pb-24 font-poppins text-black">
      
      {/* --- CONTACT HERO: FULL-BLEED EDITORIAL STYLE --- */}
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
                  "url('/images/contact_dsc.jpg')",
              }}
            />
          </motion.div>

          {/* Cinematic overlay */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/18 to-black/18" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/28 via-transparent to-transparent" />

          {/* Hero Content */}
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
                  Let&apos;s Build Your
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

      {/* --- SPLIT-PANE SECTION: FORM & DETAILS --- */}
      <section id="inquiry" className="mx-auto mt-24 max-w-[1440px] px-6 md:px-12">
        <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
          
          {/* LEFT: FORM */}
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
                  className="w-full rounded-xl border-none bg-white p-5 font-medium outline-none ring-1 ring-gray-100 transition-all placeholder:text-gray-500 focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="space-y-2">
                <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="john@dscstrata.com"
                  className="w-full rounded-xl border-none bg-white p-5 font-medium outline-none ring-1 ring-gray-100 transition-all placeholder:text-gray-500 focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Subject
                </label>
                <select className="w-full appearance-none rounded-xl border-none bg-white p-5 font-medium outline-none ring-1 ring-gray-100 transition-all focus:ring-2 focus:ring-black">
                  <option>Select product type</option>
                  <option>Residential Flooring</option>
                  <option>Commercial Projects</option>
                  <option>Material Sourcing</option>
                </select>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Message
                </label>
                <textarea
                  rows="6"
                  placeholder="Tell us about your project or general inquiry..."
                  className="w-full resize-none rounded-xl border-none bg-white p-5 font-medium outline-none ring-1 ring-gray-100 transition-all placeholder:text-gray-500 focus:ring-2 focus:ring-black"
                />
              </div>

              <div className="md:col-span-2">
                <button className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-black py-6 font-bold text-white transition-all hover:bg-gray-800">
                  Submit Inquiry
                  <ArrowRight
                    size={20}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            </form>
          </motion.div>

          {/* RIGHT: DETAILS + MAP */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex w-full flex-col gap-6 lg:w-[40%]"
          >
            <div className="flex min-h-[350px] flex-col justify-between rounded-[2rem] bg-[#1A1A1A] p-12 text-white">
              <div className="space-y-10">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 rounded-lg bg-white/5 p-3 text-[#A3993D]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold leading-tight">Visit our Showroom</h4>
                    <p className="mt-2 text-base text-gray-400">
                    1 Sahid Basu Smriti Marga, <br />Kirtipur 44618 
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 rounded-lg bg-white/5 p-3 text-[#A3993D]">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold leading-tight">Phone Number</h4>
                    <p className="mt-2 text-base text-gray-400">+977 9851100165</p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 rounded-lg bg-white/5 p-3 text-[#A3993D]">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold leading-tight">Email</h4>
                    <p className="mt-2 text-base text-gray-400">hello@dscstrata.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex-grow min-h-[350px] overflow-hidden rounded-[2rem] bg-gray-100 group">
  {/* The Map Embed */}
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019807541151!2d-122.4012016!3d37.787474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808b260f5555%3A0x6b77209774640984!2sStrata%20Flooring!5e0!3m2!1sen!2sus!4v1711920000000!5m2!1sen!2sus"
    width="100%"
    height="100%"
    className="absolute inset-0 border-0 "
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>

  {/* The "Internal Frame" Overlay - creates that thick inset border look */}
 

  {/* Optional: Minimalist Location Tag (Replaces the large "Insert Map" box) */}
  <div className="absolute bottom-10 left-10 rounded-2xl bg-white/90 px-6 py-3 shadow-2xl backdrop-blur-md">
    <p className="text-[10px] font-bold uppercase tracking-widest text-[#0D3A4B]/40">Headquarters</p>
    <p className="text-sm font-semibold text-[#0D3A4B]">1 Sahid Basu Smriti Marga, Kirtipur 44618</p>
  </div>
</div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;