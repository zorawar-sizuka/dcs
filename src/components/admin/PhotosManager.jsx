"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, ImagePlus, X, RefreshCw } from "lucide-react";
import toast from "react-hot-toast";

const heightOptions = [
  { label: "Small", value: "h-[220px] sm:h-[260px] lg:h-[290px]" },
  { label: "Medium", value: "h-[280px] sm:h-[320px] lg:h-[360px]" },
  { label: "Large", value: "h-[320px] sm:h-[360px] lg:h-[400px]" },
  { label: "Tall", value: "h-[340px] sm:h-[390px] lg:h-[430px]" },
];

export default function PhotosManager() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [alt, setAlt] = useState("DSC Project");
  const [height, setHeight] = useState(heightOptions[1].value);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/photos");
      if (res.ok) setPhotos(await res.json());
    } catch {
      toast.error("Failed to fetch photos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Select an image");
      return;
    }

    setUploading(true);
    try {
      // Upload file first
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "photos");
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const { url } = await uploadRes.json();

      // Create photo record
      const res = await fetch("/api/photos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, alt, height }),
      });

      if (res.ok) {
        toast.success("Photo added!");
        setFile(null);
        setPreview(null);
        setAlt("DSC Project");
        setShowForm(false);
        fetchPhotos();
      }
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this photo?")) return;
    try {
      const res = await fetch(`/api/photos/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Photo deleted");
        fetchPhotos();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-black">Photos CMS</h2>
          <p className="text-sm text-gray-400 font-medium mt-1">
            Manage Visual Portfolio gallery • {photos.length} photos
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={fetchPhotos}
            className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50"
          >
            <RefreshCw size={14} /> Refresh
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 rounded-xl bg-[#235fe7] px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#1d4fc4]"
          >
            <ImagePlus size={14} /> Add Photo
          </button>
        </div>
      </div>

      {/* Upload Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleUpload}
              className="rounded-2xl border border-black/5 bg-white p-6 space-y-5"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-black">Upload New Photo</h3>
                <button type="button" onClick={() => setShowForm(false)}>
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* File Input */}
              <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex-1 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-10 cursor-pointer hover:border-[#235fe7]/30 hover:bg-[#235fe7]/3 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="h-32 w-auto rounded-xl object-cover"
                    />
                  ) : (
                    <>
                      <Upload size={28} className="text-gray-300 mb-2" />
                      <p className="text-sm font-semibold text-gray-400">
                        Click to upload
                      </p>
                    </>
                  )}
                </label>

                <div className="flex-1 space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                      Alt Text
                    </label>
                    <input
                      type="text"
                      value={alt}
                      onChange={(e) => setAlt(e.target.value)}
                      placeholder="Describe the image"
                      className="w-full rounded-xl border border-gray-200 bg-white p-3.5 text-sm font-semibold text-black outline-none transition-all focus:border-[#235fe7] focus:ring-4 focus:ring-[#235fe7]/5 shadow-sm placeholder:text-gray-300"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">
                      Card Height
                    </label>
                    <select
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full appearance-none rounded-xl border border-gray-200 bg-white p-3.5 text-sm font-semibold text-black outline-none transition-all focus:border-[#235fe7] focus:ring-4 focus:ring-[#235fe7]/5 shadow-sm"
                    >
                      {heightOptions.map((opt) => (
                        <option key={opt.label} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] py-3.5 text-sm font-bold text-white hover:bg-[#235fe7] transition-all disabled:opacity-50"
              >
                {uploading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <>
                    <Upload size={16} /> Upload Photo
                  </>
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gallery Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square animate-pulse rounded-2xl bg-white border border-black/5" />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-black/5 bg-white">
          <ImagePlus size={40} className="text-gray-200 mb-4" />
          <p className="text-sm font-bold text-gray-400">No photos uploaded</p>
          <p className="text-xs text-gray-300 mt-1">Click "Add Photo" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <motion.div
              key={photo.id}
              layout
              className="group relative aspect-square overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm"
            >
              <img
                src={photo.url}
                alt={photo.alt}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                <button
                  onClick={() => handleDelete(photo.id)}
                  className="opacity-0 group-hover:opacity-100 transition-all p-3 rounded-full bg-red-500 text-white hover:bg-red-600 hover:scale-110"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-all">
                <p className="text-[9px] font-black uppercase tracking-widest text-white bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1 truncate">
                  {photo.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
