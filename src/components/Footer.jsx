// components/Footer.jsx
"use client";
import React from "react";

/* Inline social icons */
const InstagramIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
    <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
  </svg>
);

const FacebookIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M13.2 21V13.2H15.8L16.2 10.4H13.2V8.6C13.2 7.78 13.44 7.22 14.62 7.22H16.3V4.72C16.01 4.68 15.03 4.6 13.88 4.6C11.48 4.6 9.86 6.04 9.86 8.7V10.4H7.5V13.2H9.86V21H13.2Z" fill="currentColor" />
  </svg>
);

const LinkedinIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
    <path d="M6.8 9.2H3.8V20H6.8V9.2Z" fill="currentColor" />
    <path d="M5.3 7.7C6.35 7.7 7.2 6.85 7.2 5.8C7.2 4.75 6.35 3.9 5.3 3.9C4.25 3.9 3.4 4.75 3.4 5.8C3.4 6.85 4.25 7.7 5.3 7.7Z" fill="currentColor" />
    <path d="M20.6 20V13.85C20.6 10.55 18.84 9 16.48 9C14.57 9 13.72 10.05 13.24 10.79V9.2H10.36C10.4 10.25 10.36 20 10.36 20H13.24V13.97C13.24 13.65 13.26 13.33 13.36 13.1C13.61 12.46 14.18 11.8 15.14 11.8C16.4 11.8 16.9 12.76 16.9 14.16V20H20.6Z" fill="currentColor" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f4] px-4 pb-6 pt-0 font-poppins text-[#111111] md:px-6 md:pb-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="rounded-[2rem] border border-black/6 bg-white px-6 py-8 md:px-10 md:py-10">
          {/* Base grid set to 2 columns for mobile side-by-side effect */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_0.9fr_0.9fr_0.8fr] lg:gap-12">
            
            {/* Brand - spans 2 columns on mobile */}
            <div className="col-span-2 lg:col-span-1 max-w-md">
              <a href="/" className="mb-6 inline-flex items-center">
                <img src="/logo/logo.jpg" alt="DSC Strata" className="h-12 w-auto object-contain md:h-14" />
              </a>
              <p className="text-[15px] leading-relaxed text-black/58">
                DSC Strata delivers refined flooring solutions for residential and
                commercial spaces through quality materials, thoughtful detailing,
                and precise installation.
              </p>
              <div className="mt-8 flex items-center gap-2.5">
                <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#03c326]/12 bg-[#03c326]/[0.06] text-[#03c326]/80 transition-colors duration-300 hover:bg-[#03c326]/[0.11]">
                  <InstagramIcon />
                </a>
                <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#003dba]/12 bg-[#003dba]/[0.06] text-[#003dba]/75 transition-colors duration-300 hover:bg-[#003dba]/[0.11]">
                  <FacebookIcon />
                </a>
                <a href="#" className="flex h-11 w-11 items-center justify-center rounded-full border border-[#A3993D]/12 bg-[#A3993D]/[0.08] text-[#A3993D] transition-colors duration-300 hover:bg-[#A3993D]/[0.13]">
                  <LinkedinIcon />
                </a>
              </div>
            </div>

            {/* Navigation - 1 column on mobile */}
            <div className="col-span-1">
              <h4 className="mb-5 text-[16px] font-semibold tracking-tight text-[#111111]">Navigation</h4>
              <ul className="space-y-3.5 text-black/58">
                <li><a href="/" className="hover:text-black transition-colors">Home</a></li>
                <li><a href="/services" className="hover:text-black transition-colors">Services</a></li>
                <li><a href="/projects" className="hover:text-black transition-colors">Projects</a></li>
                <li><a href="/blogs" className="hover:text-black transition-colors">Blogs</a></li>
                <li><a href="/contact" className="hover:text-black transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Expertise - 1 column on mobile */}
            <div className="col-span-1">
              <h4 className="mb-5 text-[16px] font-semibold tracking-tight text-[#111111]">Expertise</h4>
              <ul className="space-y-3.5 text-black/58">
                <li>Hardwood</li>
                <li>Vinyl</li>
                <li>Natural Stone</li>
                <li>Carpet</li>
                <li>Restoration</li>
              </ul>
            </div>

            {/* Contact - spans 2 columns on mobile */}
            <div className="col-span-2 lg:col-span-1">
              <h4 className="mb-5 text-[16px] font-semibold tracking-tight text-[#111111]">Contact</h4>
              <div className="space-y-3.5 text-black/58">
                <p>1 Sahid Basu Smriti Marga, </p>
                <p>Kirtipur 44618</p>

                <p className="pt-2 text-black/78">hello@dscstrata.com</p> 
                <p className="pt-2 text-black">+977 9851100165</p>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-black/6 pt-5 text-[12px] text-black/42 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p>© {new Date().getFullYear()} DSC . All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-black/70 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-black/70 transition-colors">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;