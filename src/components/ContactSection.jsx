import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  MessageCircle, 
  CheckCircle, 
  Navigation, 
  ExternalLink,
  ShieldCheck,
  Building
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { instituteInfo, coursesData } from '../data/instituteData';

export default function ContactSection() {
  const { lang } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: 'MP CPCT Complete Preparation (Theory + Typing)',
    batchTime: 'Morning Batch (7 AM - 10 AM)',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    // Save locally
    const existing = JSON.parse(localStorage.getItem('boss_computer_inquiries') || '[]');
    existing.push({ ...formData, date: new Date().toISOString() });
    localStorage.setItem('boss_computer_inquiries', JSON.stringify(existing));

    setSubmitted(true);
  };

  const handleWhatsAppSend = () => {
    const text = `Hello Boss Computer Betul! My name is ${formData.name || 'Student'}. Phone: ${formData.phone || 'N/A'}. Interested Course: ${formData.course}. Preferred Time: ${formData.batchTime}. Message: ${formData.message || 'Please guide regarding admission and fees.'}`;
    window.open(`https://wa.me/${instituteInfo.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider mb-3">
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>{lang === 'hi' ? 'संस्थान का पता एवं संपर्क' : 'Visit Us in Betul'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            {lang === 'hi' ? (
              <>
                कालापाठा रोड, बैतूल स्थित <span className="text-amber-400">सेंटर पर पधारें</span>
              </>
            ) : (
              <>
                Get in Touch with <span className="text-amber-400">Boss Computer Betul</span>
              </>
            )}
          </h2>

          <p className="text-slate-300 text-sm sm:text-base">
            {lang === 'hi'
              ? 'संस्कार चौक / संजय कॉलोनी के निकट कालापाठा रोड, बैतूल। प्रतिदिन सुबह 7 बजे से रात 8 बजे तक खुला।'
              : 'Conveniently situated near Sanskar Chowk / Sanjay Colony on Kalapatha Road, Betul (M.P.). Open Monday to Saturday 7 AM to 8 PM.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards + Location Map */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Quick Contact Badges Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Address card */}
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-3">
                  <Building className="w-5 h-5 text-amber-400" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">
                  {lang === 'hi' ? 'संस्थान का पता' : 'Institute Address'}
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {instituteInfo.address}
                </p>
                <div className="text-[11px] text-amber-300 font-medium">
                  Landmark: {instituteInfo.landmark}
                </div>
              </div>

              {/* Phone & Timings card */}
              <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                  <Phone className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-white text-sm mb-1">
                  {lang === 'hi' ? 'फोन एवं सहायता' : 'Call & Batch Timings'}
                </h4>
                <div className="space-y-1 text-xs text-slate-300 mb-2">
                  <div>Primary: <a href={`tel:${instituteInfo.phone.replace(/[^0-9+]/g, '')}`} className="text-amber-300 font-bold hover:underline">{instituteInfo.phone}</a></div>
                  <div>Mon - Sat: <strong>7:00 AM - 8:00 PM</strong></div>
                  <div>Sunday: <strong>9:00 AM - 2:00 PM</strong></div>
                </div>
              </div>
            </div>

            {/* Embedded Google Map */}
            <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
              <div className="p-3 bg-slate-900 border-b border-slate-700/80 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Navigation className="w-3.5 h-3.5 text-blue-400" />
                  Google Maps: Kalapatha Road, Betul, MP
                </span>
                <a
                  href="https://maps.google.com/?q=Boss+Computer+Typing+Institute+Kalapatha+Road+Betul"
                  target="_blank"
                  rel="noreferrer"
                  className="text-amber-300 hover:text-white flex items-center gap-1 font-bold"
                >
                  <span>Open in App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="relative h-64 sm:h-72 w-full bg-slate-900">
                <iframe
                  title="Boss Computer Betul Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3701.378772097893!2d77.8967814!3d21.9056024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd6098696eb6401%3A0xc3457a3e742c8d23!2sKalapatha%20Rd%2C%20Betul%2C%20Madhya%20Pradesh%20460001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="filter contrast-125"
                />
              </div>

              <div className="p-3 bg-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
                <span>📍 Walking distance from Sanskar Chowk & Sanjay Colony.</span>
                <a
                  href="https://maps.google.com/?q=Boss+Computer+Typing+Institute+Kalapatha+Road+Betul"
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-blue-400 hover:text-blue-300"
                >
                  Get Driving Directions ➔
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Direct Admission & Inquiry Form */}
          <div className="lg:col-span-5 bg-slate-800/90 rounded-2xl p-6 sm:p-8 border border-slate-700 shadow-2xl backdrop-blur-md">
            <div className="mb-6">
              <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                {lang === 'hi' ? 'ऑनलाइन प्रवेश पूछताछ' : 'Admissions Open'}
              </span>
              <h3 className="text-xl font-extrabold text-white">
                {lang === 'hi' ? 'फ्री काउंसलिंग एवं सीट बुकिंग' : 'Inquire Now & Claim Free Demo'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Fill the quick form below or reach us instantly via WhatsApp.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-950/80 border border-emerald-500/50 rounded-2xl p-6 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white">Thank You, {formData.name}!</h4>
                <p className="text-xs text-emerald-200 leading-relaxed">
                  Your inquiry for <strong>{formData.course}</strong> has been registered. Our faculty at Kalapatha Road will call you shortly to confirm your batch.
                </p>

                <div className="pt-2">
                  <button
                    onClick={handleWhatsAppSend}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send this on WhatsApp for Instant Confirmation</span>
                  </button>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-slate-400 hover:text-white underline pt-2 block mx-auto"
                >
                  Submit another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Mobile / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 98260XXXXX"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Select Desired Course
                  </label>
                  <select
                    value={formData.course}
                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                  >
                    {coursesData.map((c) => (
                      <option key={c.id} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Batch Timing
                  </label>
                  <select
                    value={formData.batchTime}
                    onChange={(e) => setFormData({ ...formData, batchTime: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition"
                  >
                    <option value="Morning Batch (7:00 AM - 10:00 AM)">Morning (7:00 AM - 10:00 AM)</option>
                    <option value="Noon Batch (11:00 AM - 3:00 PM)">Afternoon (11:00 AM - 3:00 PM)</option>
                    <option value="Evening Batch (4:00 PM - 8:00 PM)">Evening (4:00 PM - 8:00 PM)</option>
                    <option value="Weekend Special Only">Weekend / Sunday Test Batch</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Any specific question or current typing speed?
                  </label>
                  <textarea
                    rows={2}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="e.g. I want to prepare for Patwari CPCT exam starting next week..."
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs sm:text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition resize-none"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-md shadow-amber-400/20 transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppSend}
                    className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 shadow-md transition flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </form>
            )}

            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Your contact information is strictly confidential. Zero spam.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
