"use client";
import React, { Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardHero from "@/components/admin/DashboardHero";
import { useDashboard } from "./layout";

const SubmissionsTable = lazy(() => import("@/components/admin/SubmissionsTable"));
const PhotosManager = lazy(() => import("@/components/admin/PhotosManager"));
const VideosManager = lazy(() => import("@/components/admin/VideosManager"));
const ProjectsManager = lazy(() => import("@/components/admin/ProjectsManager"));
const BlogsManager = lazy(() => import("@/components/admin/BlogsManager"));

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="h-8 w-8 animate-spin rounded-full border-3 border-gray-200 border-t-[#235fe7]" />
    </div>
  );
}

export default function DashboardPage() {
  const { activeTab, setActiveTab } = useDashboard();
  
  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <DashboardHero setActiveTab={setActiveTab} />;
      case "submissions":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <SubmissionsTable />
          </Suspense>
        );
      case "photos":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <PhotosManager />
          </Suspense>
        );
      case "videos":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <VideosManager />
          </Suspense>
        );
      case "projects":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <ProjectsManager />
          </Suspense>
        );
      case "blogs":
        return (
          <Suspense fallback={<LoadingFallback />}>
            <BlogsManager />
          </Suspense>
        );
      default:
        return <DashboardHero setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-[calc(100vh-6rem)]">
      <AnimatePresence mode="wait">
        <motion.div
           key={activeTab}
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           exit={{ opacity: 0, y: -10 }}
           transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
