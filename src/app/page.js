"use client"

import Hero from "@/components/Hero";
import ServicesSection from "@/components/Services"; 
import { PhotoGallery, VideoGallery, MediaModal } from "@/components/Gallery";
import { useState } from "react";
import dynamic_next from "next/dynamic";
const AboutSection = dynamic_next(() => import("@/components/About"), { 
  ssr: false,
  loading: () => <section className="relative w-full bg-white px-6 py-32 font-poppins min-h-[600px]" />
});
import TypeSection from "@/components/Type";
import TestimonialSection from "@/components/Testimonials";
import CTASection from "@/components/CTA";


export default function Home() { 

  // State to manage the Modal
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: 'image', 
    url: ''
  });

  // Function to trigger the modal from any child component
  const openMedia = (type, url) => {
    setModalConfig({
      isOpen: true,
      type: type,
      url: url
    });
  };

  const closeMedia = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  }; 


  return (
  
  <main className="bg-white min-h-screen">
   <Hero/>
  <ServicesSection/>    
  <TypeSection/> 
  <PhotoGallery onOpen={openMedia} />
  <VideoGallery onOpen={openMedia} />
  <MediaModal 
  isOpen={modalConfig.isOpen} 
  onClose={closeMedia} 
  type={modalConfig.type} 
  url={modalConfig.url} 
 /> 
  <AboutSection/> 
  <TestimonialSection/>
  <CTASection/>

  </main>
  );
}
