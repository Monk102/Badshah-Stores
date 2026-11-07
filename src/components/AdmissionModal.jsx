import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  Calendar, 
  Clock, 
  GraduationCap,
  ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { instituteInfo, coursesData } from '../data/instituteData';

export default function AdmissionModal({ isOpen, onClose }) {
  const { lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: 'MP CPCT Complete Preparation (Theory + Typing)',
    date: '',
    batchTime: 'Morning Batch (8:00 AM - 10:00 AM)',
    notes: ''
  });

  const [confirmed, setConfirmed] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Save in local storage
    const list = JSON.parse(localStorage.getItem('boss_computer_demos') || '[]');
    list.push({ ...formData, registeredAt: new Date().toISOString() });
    localStorage.setItem('boss_computer_demos', JSON.stringify(list));

    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 }
    });

    setConfirmed(true);
  };

  const handleWhatsApp = () => {
    const text = `Hello Boss Computer Betul! I booked a 2-Day Free Demo Class on your website.\nName: ${formData.name}\nPhone: ${formData.phone}\nCourse: ${formData.course}\nPreferred Slot: ${formData.batchTime}\nDate: ${formData.date || 'Immediate'}`;
    window.open(`https://wa.me/${instituteInfo.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const resetAndClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 relative">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-6 relative">
          <button
            onClick={resetAndClose}
            className="absolute top-5 right-5 p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>100% Free • No Payment Required</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            {lang === 'hi' ? '2-दिन की निःशुल्क डेमो क्लास' : 'Book 2-Day Free Trial Class'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Experience our exam-identical keyboards, modern lab, and personalized teaching in Betul.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {confirmed ? (
            <div className="text-center py-4 space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900">
                  Demo Pass Reserved!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mt-1">
                  Congratulations <strong>{formData.name}</strong>, your complimentary 2-day trial seat is booked for <strong>{formData.course}</strong> at our Kalapatha Road, Betul center.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs text-left space-y-1.5 text-slate-700">
                <div>📍 <strong>Address:</strong> Near Sanskar Chowk, Kalapatha Road, Betul</div>
                <div>⏱️ <strong>Preferred Timing:</strong> {formData.batchTime}</div>
                <div>📞 <strong>Contact Desk:</strong> {instituteInfo.phone}</div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={handleWhatsApp}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Pass Details to WhatsApp</span>
                </button>

                <button
                  onClick={resetAndClose}
                  className="w-full py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-semibold text-xs transition"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Student Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  WhatsApp Contact Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Select Program
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                  >
                    {coursesData.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Preferred Batch Time
                  </label>
                  <select
                    value={formData.batchTime}
                    onChange={(e) => setFormData({ ...formData, batchTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none"
                  >
                    <option value="Morning Batch (7:00 AM - 10:00 AM)">Morning (7 AM - 10 AM)</option>
                    <option value="Noon Batch (11:00 AM - 3:00 PM)">Afternoon (11 AM - 3 PM)</option>
                    <option value="Evening Batch (4:00 PM - 8:00 PM)">Evening (4 PM - 8 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Preferred Visit Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-700 focus:border-blue-600 outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Confirm Free Demo Pass</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Zero registration fee. You can attend 2 full days before deciding.</span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
