"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingDock from "@/components/FloatingDock";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith("/admin");

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    > 
   
      <body className="min-h-full flex flex-col">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#1A1A1A",
            color: "#fff",
            borderRadius: "1rem",
            padding: "14px 20px",
            fontSize: "14px",
            fontWeight: "600",
          },
          success: {
            iconTheme: { primary: "#03c326", secondary: "#fff" },
          },
          error: {
            iconTheme: { primary: "#ef4444", secondary: "#fff" },
          },
        }}
      />
      {!isAdminPath && <Navbar/>}
        {children} 
        {!isAdminPath && <FloatingDock/>}
        {!isAdminPath && <Footer/>}
        </body> 
       
    </html>
  );
}
