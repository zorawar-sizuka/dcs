"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, Edit3, X, RefreshCw, Plus, FolderKanban, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

const categoryOptions = ["Sheet Vinyl", "Vinyl Plank", "Carpet Tiles", "Commercial Carpets"];

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/projects");
      if (res.ok) setProjects(await res.json());
    } catch {
      toast.error("Failed to fetch projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  const resetForm = () => {
    setTitle("");
    setCategory(categoryOptions[0]);
    setFile(null);
    setPreview(null);
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setTitle(project.title);
    setCategory(project.category);
    setPreview(project.image);
    setShowForm(true);
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setFile(f);
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !category) {
      toast.error("Title and category are required");
      return;
    }
    if (!editingId && !file) {
      toast.error("Image is required");
      return;
    }

    setUploading(true);
    try {
      let imageUrl = editingId ? preview : null;

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "projects");
        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await uploadRes.json();
        imageUrl = data.url;
      }

      if (editingId) {
        const res = await fetch(`/api/projects/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, category, image: imageUrl }),
        });
        if (res.ok) toast.success("Project updated!");
      } else {
        const res = await fetch("/api/projects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, category, image: imageUrl }),
        });
        if (res.ok) toast.success("Project created!");
      }

      resetForm();
      fetchProjects();
    } catch {
      toast.error("Operation failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Project deleted");
        fetchProjects();
      }
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-black">Projects CMS</h2>
          <p className="text-sm text-gray-400 font-medium mt-1">Manage Featured Projects • {projects.length} projects</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchProjects} className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="flex items-center gap-2 rounded-xl bg-[#235fe7] px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#1d4fc4]">
            <Plus size={14} /> Add Project
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-black/5 bg-white p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-black">{editingId ? "Edit Project" : "New Project"}</h3>
                <button type="button" onClick={resetForm}><X size={20} className="text-gray-400" /></button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Project Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Ohio Construction Office" className="w-full rounded-xl border border-gray-200 bg-white p-3.5 text-sm font-semibold text-black outline-none transition-all focus:border-[#235fe7] focus:ring-4 focus:ring-[#235fe7]/5 shadow-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Category</label>
                  <div className="relative">
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full appearance-none rounded-xl border border-gray-200 bg-white p-3.5 text-sm font-semibold text-black outline-none transition-all focus:border-[#235fe7] focus:ring-4 focus:ring-[#235fe7]/5 shadow-sm">
                      {categoryOptions.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Project Image</label>
                <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-10 cursor-pointer hover:border-[#235fe7]/30 transition-all">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  {preview ? <img src={preview} alt="Preview" className="h-32 w-auto rounded-xl object-cover" /> : <><Upload size={28} className="text-gray-300 mb-2" /><p className="text-sm font-semibold text-gray-400">Click to upload image</p></>}
                </label>
              </div>

              <button type="submit" disabled={uploading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] py-3.5 text-sm font-bold text-white hover:bg-[#235fe7] transition-all disabled:opacity-50">
                {uploading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : editingId ? "Update Project" : "Create Project"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => <div key={i} className="aspect-[4/3] animate-pulse rounded-2xl bg-white border border-black/5" />)}
        </div>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-black/5 bg-white">
          <FolderKanban size={40} className="text-gray-200 mb-4" />
          <p className="text-sm font-bold text-gray-400">No projects yet</p>
          <p className="text-xs text-gray-300 mt-1">Click "Add Project" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <motion.div key={project.id} layout className="group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="text-[10px] font-black uppercase tracking-widest text-[#A3993D] mb-1">{project.category}</p>
                <h3 className="text-sm font-bold text-[#1A1A1A] tracking-tight">{project.title}</h3>
              </div>
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => handleEdit(project)} className="p-2.5 rounded-xl bg-white/90 backdrop-blur-sm text-[#235fe7] hover:bg-[#235fe7] hover:text-white transition-all shadow-md">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => handleDelete(project.id)} className="p-2.5 rounded-xl bg-white/90 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md">
                  <Trash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
