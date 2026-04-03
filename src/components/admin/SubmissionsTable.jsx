"use client";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Trash2,
  Download,
  FileSpreadsheet,
  CheckSquare,
  Square,
  Search,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import toast from "react-hot-toast";

const sourceColors = {
  hero: "bg-[#E3F2FD] text-blue-700",
  contact: "bg-[#E8F5E9] text-green-700",
  inquiry: "bg-[#FEF9E7] text-[#A3993D]",
};

export default function SubmissionsTable() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(new Set());
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(false);

  const fetchSubmissions = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/submissions");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch {
      toast.error("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const filtered = submissions.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.source.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSelect = (id) => {
    const next = new Set(selected);
    next.has(id) ? next.delete(id) : next.add(id);
    setSelected(next);
  };

  const toggleAll = () => {
    if (selected.size === filtered.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(filtered.map((s) => s.id)));
    }
  };

  const handleDelete = async () => {
    if (selected.size === 0) {
      toast.error("Select items to delete");
      return;
    }

    setDeleting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: Array.from(selected) }),
      });

      if (res.ok) {
        toast.success(`Deleted ${selected.size} submission(s)`);
        setSelected(new Set());
        fetchSubmissions();
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const handleDeleteAll = async () => {
    if (!confirm("Are you sure you want to delete ALL submissions?")) return;

    setDeleting(true);
    try {
      const res = await fetch("/api/submissions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids: [] }),
      });

      if (res.ok) {
        toast.success("All submissions deleted");
        setSelected(new Set());
        fetchSubmissions();
      }
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const handleExportCSV = () => {
    window.open("/api/submissions/export", "_blank");
    toast.success("CSV download started");
  };

  const handleExportPDF = async () => {
    const rows =
      selected.size > 0
        ? filtered.filter((s) => selected.has(s.id))
        : filtered;

    if (rows.length === 0) {
      toast.error("No data to export");
      return;
    }

    try {
      const { jsPDF } = await import("jspdf");
      const { default: autoTable } = await import("jspdf-autotable");

      const doc = new jsPDF({ orientation: "landscape" });
      doc.setFontSize(18);
      doc.text("DCS Strata — Form Submissions", 14, 20);
      doc.setFontSize(10);
      doc.setTextColor(128);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 14, 28);

      autoTable(doc, {
        startY: 35,
        head: [["Name", "Email", "Phone", "Service", "Message", "Source", "Date"]],
        body: rows.map((s) => [
          s.name,
          s.email,
          s.phone,
          s.serviceType,
          s.message.length > 50 ? s.message.slice(0, 50) + "..." : s.message,
          s.source,
          new Date(s.createdAt).toLocaleDateString(),
        ]),
        styles: { fontSize: 8, cellPadding: 3 },
        headStyles: { fillColor: [35, 95, 231], fontStyle: "bold" },
        alternateRowStyles: { fillColor: [248, 250, 252] },
      });

      doc.save(`dcs-submissions-${Date.now()}.pdf`);
      toast.success("PDF downloaded");
    } catch (error) {
      console.error(error);
      toast.error("PDF generation failed");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-2xl bg-white border border-black/5"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-black">
            Form Submissions
          </h2>
          <p className="text-sm text-gray-400 font-medium mt-1">
            {submissions.length} total entries
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={fetchSubmissions}
            className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all"
          >
            <RefreshCw size={14} />
            Refresh
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-xl border border-black/5 bg-white px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-gray-500 hover:bg-gray-50 transition-all"
          >
            <FileSpreadsheet size={14} />
            CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 rounded-xl bg-[#235fe7] px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-[#1d4fc4] transition-all"
          >
            <Download size={14} />
            PDF {selected.size > 0 && `(${selected.size})`}
          </button>
        </div>
      </div>

      {/* Search + Actions Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-black/5 bg-white p-4">
        <div className="relative flex-1 max-w-sm">
          <Search
            size={18}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, source..."
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm font-semibold text-black outline-none transition-all focus:border-[#235fe7] focus:ring-4 focus:ring-[#235fe7]/5 shadow-sm placeholder:text-gray-300"
          />
        </div>

        <div className="flex items-center gap-2">
          {selected.size > 0 && (
            <>
              <span className="text-xs font-bold text-gray-400">
                {selected.size} selected
              </span>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white hover:bg-red-600 transition-all disabled:opacity-50"
              >
                <Trash2 size={14} />
                Delete Selected
              </button>
            </>
          )}
          <button
            onClick={handleDeleteAll}
            disabled={deleting || submissions.length === 0}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-red-500 hover:bg-red-100 transition-all disabled:opacity-50"
          >
            <AlertTriangle size={14} />
            Delete All
          </button>
        </div>
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 rounded-2xl border border-black/5 bg-white">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-50">
            <FileSpreadsheet size={28} className="text-gray-300" />
          </div>
          <p className="text-sm font-bold text-gray-400">No submissions yet</p>
          <p className="text-xs text-gray-300 mt-1">
            Form data will appear here
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-black/5 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/5 bg-gray-50/50">
                <th className="p-4 w-12">
                  <button onClick={toggleAll}>
                    {selected.size === filtered.length ? (
                      <CheckSquare size={18} className="text-[#235fe7]" />
                    ) : (
                      <Square size={18} className="text-gray-300" />
                    )}
                  </button>
                </th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Name
                </th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hidden md:table-cell">
                  Email
                </th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hidden lg:table-cell">
                  Phone
                </th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hidden lg:table-cell">
                  Service
                </th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hidden xl:table-cell">
                  Message
                </th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Source
                </th>
                <th className="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400 hidden sm:table-cell">
                  Date
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((sub) => (
                <motion.tr
                  key={sub.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`border-b border-black/3 transition-colors hover:bg-gray-50/50 ${
                    selected.has(sub.id) ? "bg-[#235fe7]/3" : ""
                  }`}
                >
                  <td className="p-4">
                    <button onClick={() => toggleSelect(sub.id)}>
                      {selected.has(sub.id) ? (
                        <CheckSquare size={18} className="text-[#235fe7]" />
                      ) : (
                        <Square size={18} className="text-gray-300" />
                      )}
                    </button>
                  </td>
                  <td className="p-4 font-semibold text-gray-900">
                    {sub.name}
                  </td>
                  <td className="p-4 text-gray-500 hidden md:table-cell">
                    {sub.email}
                  </td>
                  <td className="p-4 text-gray-500 hidden lg:table-cell">
                    {sub.phone || "—"}
                  </td>
                  <td className="p-4 text-gray-500 hidden lg:table-cell">
                    {sub.serviceType}
                  </td>
                  <td className="p-4 text-gray-400 hidden xl:table-cell max-w-[200px] truncate">
                    {sub.message || "—"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                        sourceColors[sub.source] || "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {sub.source}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-xs hidden sm:table-cell">
                    {new Date(sub.createdAt).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
