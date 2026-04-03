"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, Video, X, RefreshCw, Plus } from "lucide-react";
import toast from "react-hot-toast";

export default function VideosManager() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [thumbPreview, setThumbPreview] = useState(null);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/videos");
      if (res.ok) setVideos(await res.json());
    } catch {
      toast.error("Failed to fetch videos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleThumbChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setThumbFile(f);
      setThumbPreview(URL.createObjectURL(f));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!title || !videoFile) {
      toast.error("Title and video file are required");
      return;
    }

    setUploading(true);
    try {
      // Upload video
      const videoForm = new FormData();
      videoForm.append("file", videoFile);
      videoForm.append("folder", "videos");
      const videoRes = await fetch("/api/upload", { method: "POST", body: videoForm });
      const { url: videoUrl } = await videoRes.json();

      // Upload thumbnail if provided
      let thumbnailUrl = "/images/thumbnail.avif";
      if (thumbFile) {
        const thumbForm = new FormData();
        thumbForm.append("file", thumbFile);
        thumbForm.append("folder", "thumbnails");
        const thumbRes = await fetch("/api/upload", { method: "POST", body: thumbForm });
        const thumbData = await thumbRes.json();
        thumbnailUrl = thumbData.url;
      }

      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, thumbnail: thumbnailUrl, videoUrl }),
      });

      if (res.ok) {
        toast.success("Video added!");
        setTitle("");
        setVideoFile(null);
        setThumbFile(null);
        setThumbPreview(null);
        setShowForm(false);
        fetchVideos();
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this video?")) return;
    try {
      const res = await fetch(`/api/videos/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Video deleted");
        fetchVideos();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-black">Videos CMS</h2>
          <p className="text-sm text-gray-400 font-medium mt-1">
            Manage Process In Motion section • {videos.length} videos
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchVideos} className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 rounded-xl bg-[#235fe7] px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#1d4fc4]">
            <Plus size={14} /> Add Video
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleUpload} className="rounded-2xl border border-black/5 bg-white p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-black">Upload New Video</h3>
                <button type="button" onClick={() => setShowForm(false)}><X size={20} className="text-gray-400" /></button>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Video Title</label>
                <input 
                  type="text" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  placeholder="e.g. Precision Install" 
                  className="w-full rounded-xl border border-gray-200 bg-white p-3.5 text-sm font-semibold text-black outline-none transition-all focus:border-[#235fe7] focus:ring-4 focus:ring-[#235fe7]/5 shadow-sm placeholder:text-gray-300" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Video File</label>
                  <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-8 cursor-pointer hover:border-[#235fe7]/30 transition-all">
                    <input type="file" accept="video/*" onChange={(e) => setVideoFile(e.target.files[0])} className="hidden" />
                    <Video size={24} className="text-gray-300 mb-2" />
                    <p className="text-xs font-semibold text-gray-400">{videoFile ? videoFile.name : "Select video"}</p>
                  </label>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Thumbnail (optional)</label>
                  <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-8 cursor-pointer hover:border-[#235fe7]/30 transition-all">
                    <input type="file" accept="image/*" onChange={handleThumbChange} className="hidden" />
                    {thumbPreview ? (
                      <img src={thumbPreview} alt="thumb" className="h-16 w-auto rounded-lg object-cover" />
                    ) : (
                      <>
                        <Upload size={24} className="text-gray-300 mb-2" />
                        <p className="text-xs font-semibold text-gray-400">Select thumbnail</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <button type="submit" disabled={uploading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] py-3.5 text-sm font-bold text-white hover:bg-[#235fe7] transition-all disabled:opacity-50">
                {uploading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : <><Upload size={16} /> Upload Video</>}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="aspect-[1.4/1] animate-pulse rounded-2xl bg-white border border-black/5" />)}
        </div>
      ) : videos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-black/5 bg-white">
          <Video size={40} className="text-gray-200 mb-4" />
          <p className="text-sm font-bold text-gray-400">No videos uploaded</p>
          <p className="text-xs text-gray-300 mt-1">Click "Add Video" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {videos.map((vid) => (
            <motion.div key={vid.id} layout className="group relative aspect-[1.4/1] overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
              <img src={vid.thumbnail} alt={vid.title} className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/50 transition-all flex items-center justify-center">
                <button onClick={() => handleDelete(vid.id)} className="opacity-0 group-hover:opacity-100 transition-all p-3 rounded-full bg-red-500 text-white hover:bg-red-600 hover:scale-110">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="absolute bottom-3 left-4 right-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white drop-shadow-md">{vid.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
