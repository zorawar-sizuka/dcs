"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Trash2, Edit3, X, RefreshCw, Plus, BookOpen } from "lucide-react";
import toast from "react-hot-toast";

const colorOptions = [
  { label: "Green", bgColor: "bg-[#E8F5E9]", accent: "text-green-700" },
  { label: "Blue", bgColor: "bg-[#E3F2FD]", accent: "text-blue-700" },
  { label: "Gold", bgColor: "bg-[#FEF9E7]", accent: "text-[#A3993D]" },
];

export default function BlogsManager() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("DCS Editorial");
  const [colorIdx, setColorIdx] = useState(0);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) setBlogs(await res.json());
    } catch {
      toast.error("Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const resetForm = () => {
    setTitle(""); setExcerpt(""); setContent(""); setCategory("");
    setAuthor("DCS Editorial"); setColorIdx(0);
    setFile(null); setPreview(null); setEditingId(null); setShowForm(false);
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setContent(blog.content);
    setCategory(blog.category);
    setAuthor(blog.author);
    setPreview(blog.image);
    const idx = colorOptions.findIndex((c) => c.bgColor === blog.bgColor);
    setColorIdx(idx >= 0 ? idx : 0);
    setShowForm(true);
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) { setFile(f); setPreview(URL.createObjectURL(f)); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !excerpt || !content || !category) {
      toast.error("All fields are required");
      return;
    }
    if (!editingId && !file) {
      toast.error("Image is required");
      return;
    }

    setUploading(true);
    try {
      const blogFields = {
        title, excerpt, content, category, author,
        bgColor: colorOptions[colorIdx].bgColor,
        accent: colorOptions[colorIdx].accent,
      };

      if (editingId) {
        // EDIT flow
        let imageUrl = preview;

        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("folder", "blogs");
          const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
          const data = await uploadRes.json();
          imageUrl = data.url;
        }

        const res = await fetch(`/api/blogs/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...blogFields, image: imageUrl }),
        });

        if (res.ok) {
          const updated = await res.json();
          toast.success("Blog updated!");
          // Optimistic update
          setBlogs((prev) => prev.map((b) => b.id === editingId ? updated : b));
        }
      } else {
        // CREATE flow: combined upload + DB save
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", "blogs");
        formData.append("createRecord", "true");
        formData.append("recordData", JSON.stringify({
          model: "blog",
          fields: blogFields,
        }));

        const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await uploadRes.json();

        if (uploadRes.ok && data.record) {
          toast.success("Blog created!");
          setBlogs((prev) => [data.record, ...prev]);
        } else {
          toast.error(data.error || "Create failed");
        }
      }

      resetForm();
    } catch {
      toast.error("Operation failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this blog post?")) return;
    
    // Optimistic delete
    const previousBlogs = blogs;
    setBlogs((prev) => prev.filter((b) => b.id !== id));
    
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Blog deleted");
      } else {
        setBlogs(previousBlogs);
        toast.error("Delete failed");
      }
    } catch {
      setBlogs(previousBlogs);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-black">Blogs CMS</h2>
          <p className="text-sm text-gray-400 font-medium mt-1">Manage Journal posts • {blogs.length} articles</p>
        </div>
        <div className="flex gap-2">
          <button onClick={fetchBlogs} className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50">
            <RefreshCw size={14} /> Refresh
          </button>
          <button onClick={() => { resetForm(); setShowForm(!showForm); }} className="flex items-center gap-2 rounded-xl bg-[#235fe7] px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#1d4fc4]">
            <Plus size={14} /> New Post
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <form onSubmit={handleSubmit} className="rounded-2xl border border-black/5 bg-white p-6 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-black">{editingId ? "Edit Blog Post" : "Create Blog Post"}</h3>
                <button type="button" onClick={resetForm}><X size={20} className="text-gray-400" /></button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Title</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog title" className="w-full rounded-xl border border-gray-200 bg-white p-3.5 text-sm font-semibold text-black outline-none transition-all focus:border-[#235fe7] focus:ring-4 focus:ring-[#235fe7]/5 shadow-sm placeholder:text-gray-300" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Category</label>
                  <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Sustainability" className="w-full rounded-xl border border-gray-200 bg-white p-3.5 text-sm font-semibold text-black outline-none transition-all focus:border-[#235fe7] focus:ring-4 focus:ring-[#235fe7]/5 shadow-sm placeholder:text-gray-300" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Author</label>
                  <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="w-full rounded-xl border border-gray-200 bg-white p-3.5 text-sm font-semibold text-black outline-none transition-all focus:border-[#235fe7] focus:ring-4 focus:ring-[#235fe7]/5 shadow-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Card Color Theme</label>
                  <div className="flex gap-3 pt-2">
                    {colorOptions.map((opt, i) => (
                      <button key={opt.label} type="button" onClick={() => setColorIdx(i)} className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-[10px] font-black uppercase tracking-widest border transition-all ${i === colorIdx ? `${opt.bgColor} ${opt.accent} border-current ring-2 ring-current ring-offset-2` : "bg-white text-gray-400 border-gray-200 hover:border-gray-300"}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Excerpt</label>
                <textarea rows="2" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Short summary..." className="w-full rounded-xl border border-gray-200 bg-white p-3.5 text-sm font-semibold text-black outline-none transition-all focus:border-[#235fe7] focus:ring-4 focus:ring-[#235fe7]/5 shadow-sm resize-none placeholder:text-gray-300" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 ml-1">Content</label>
                <textarea rows="6" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Full article content..." className="w-full rounded-xl border border-gray-200 bg-white p-3.5 text-sm font-semibold text-black outline-none transition-all focus:border-[#235fe7] focus:ring-4 focus:ring-[#235fe7]/5 shadow-sm resize-none placeholder:text-gray-300" />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-1">Cover Image</label>
                <label className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 py-10 cursor-pointer hover:border-[#235fe7]/30 transition-all">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  {preview ? <img src={preview} alt="Preview" className="h-32 w-auto rounded-xl object-cover" /> : <><Upload size={28} className="text-gray-300 mb-2" /><p className="text-sm font-semibold text-gray-400">Click to upload cover image</p></>}
                </label>
              </div>

              <button type="submit" disabled={uploading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#1A1A1A] py-3.5 text-sm font-bold text-white hover:bg-[#235fe7] transition-all disabled:opacity-50">
                {uploading ? <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" /> : editingId ? "Update Post" : "Publish Post"}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => <div key={i} className="h-80 animate-pulse rounded-[2rem] bg-white border border-black/5" />)}
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-black/5 bg-white">
          <BookOpen size={40} className="text-gray-200 mb-4" />
          <p className="text-sm font-bold text-gray-400">No blog posts yet</p>
          <p className="text-xs text-gray-300 mt-1">Click "New Post" to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <motion.div key={blog.id} layout className={`group relative flex flex-col rounded-[2rem] ${blog.bgColor} border border-black/5 overflow-hidden transition-all hover:shadow-lg`}>
              <div className="aspect-[1.4/1] overflow-hidden rounded-t-[2rem]">
                <img src={blog.image} alt={blog.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${blog.accent} mb-2`}>{blog.category}</span>
                <h3 className="text-xl font-bold tracking-tight text-black mb-2 line-clamp-2">{blog.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{blog.excerpt}</p>
                <p className="mt-auto text-[10px] font-bold uppercase tracking-widest text-gray-400">{blog.author} • {new Date(blog.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                <button onClick={() => handleEdit(blog)} className="p-2.5 rounded-xl bg-white/90 backdrop-blur-sm text-[#235fe7] hover:bg-[#235fe7] hover:text-white transition-all shadow-md">
                  <Edit3 size={14} />
                </button>
                <button onClick={() => handleDelete(blog.id)} className="p-2.5 rounded-xl bg-white/90 backdrop-blur-sm text-red-500 hover:bg-red-500 hover:text-white transition-all shadow-md">
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
