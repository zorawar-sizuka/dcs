"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, ChevronDown, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const InquiryModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.serviceType) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'inquiry' })
      });

      if (res.ok) {
        toast.success('Inquiry sent successfully!');
        setFormData({ name: '', email: '', phone: '', serviceType: '', message: '' });
        onClose();
      } else {
        toast.error('Failed to send request. Try again.');
      }
    } catch (error) {
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <AnimatePresence>
      {isOpen && (
        /* The Wrapper: Forces the modal ABOVE everything (Navbar included) */
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-6">
          
          {/* THE UNDERLAY: Dims and blurs the entire page */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-2xl"
          />

          {/* THE MODAL CARD: Reduced height and optimized spacing */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-[950px] overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]"
          >
            <div className="flex flex-col md:flex-row">
              
              {/* LEFT SIDE: Brand Accent (Condensed) */}
              <div className="hidden md:flex w-[35%] bg-[#E3F2FD] p-10 flex-col justify-between border-r border-blue-50">
                <div>
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm text-blue-600">
                    <CheckCircle2 size={24} />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter text-slate-900 leading-tight">
                    Let’s build <br /> your <span className="text-blue-600">dream.</span>
                  </h2>
                  <p className="mt-4 text-slate-500 text-sm font-medium leading-relaxed">
                    Consult with our specialists about premium flooring and custom fit-outs.
                  </p>
                </div>
                
                <div className="pt-6 border-t border-blue-200/50">
                   <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Response time</p>
                   <p className="text-sm font-bold text-slate-700">Within 24 Hours</p>
                </div>
              </div>

              {/* RIGHT SIDE: The Form (Reduced Height & High Contrast) */}
              <div className="flex-1 p-8 md:p-12 relative bg-white">
                
                {/* Close Button: Placed to avoid collision */}
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-50 text-slate-900 hover:bg-red-500 hover:text-white transition-all duration-300 z-50 shadow-sm"
                >
                  <X size={20} strokeWidth={3} />
                </button>

                <div className="mb-8">
                  <h3 className="text-2xl font-bold tracking-tight text-slate-900">Quick Inquiry</h3>
                  <div className="h-1 w-12 bg-blue-500 mt-2 rounded-full" />
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                  {/* Row 1 */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Full Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Name" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Email" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Phone Number</label>
                    <input 
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="Phone" 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Service Type *</label>
                    <div className="relative">
                      <select 
                        required
                        value={formData.serviceType}
                        onChange={(e) => setFormData(prev => ({ ...prev, serviceType: e.target.value }))}
                        className={`w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-semibold appearance-none focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all ${formData.serviceType ? 'text-slate-900' : 'text-slate-400'}`}
                      >
                        <option value="" disabled>Select Service Type</option>
                        <option value="Residential Flooring">Residential Flooring</option>
                        <option value="Commercial Projects">Commercial Projects</option>
                        <option value="General Support">General Support</option>
                      </select>
                      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                    </div>
                  </div>

                  {/* Row 3 */}
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Message</label>
                    <textarea 
                      rows="3" 
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Briefly describe your needs..." 
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3.5 font-semibold text-slate-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="md:col-span-2 pt-2">
                    <button 
                      type="submit"
                      disabled={loading}
                      className="group flex w-full items-center justify-center gap-3 rounded-xl bg-black py-4 text-base font-bold text-white transition-all hover:bg-blue-600 active:scale-[0.98] shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Sending...' : 'Send Inquiry'}
                      {loading ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      )}
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default InquiryModal;