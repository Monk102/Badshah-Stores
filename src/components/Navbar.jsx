import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Menu, 
  X, 
  Monitor, 
  Keyboard, 
  Languages, 
  Sparkles,
  Award
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { instituteInfo } from '../data/instituteData';

export default function Navbar({ onOpenDemoModal, onOpenTypingTest }) {
  const { lang, toggleLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: lang === 'hi' ? 'मुख्य पृष्ठ' : 'Home', href: '#home' },
    { name: lang === 'hi' ? 'पाठ्यक्रम (Courses)' : 'Courses', href: '#courses' },
    { name: lang === 'hi' ? 'टाइपिंग टेस्ट' : 'Live Typing Test', href: '#typing-test', special: true },
    { name: lang === 'hi' ? 'सीपीसीटी गाइड' : 'CPCT Guide', href: '#cpct-guide' },
    { name: lang === 'hi' ? 'सुविधाएं एवं लैब' : 'Lab & Facilities', href: '#facilities' },
    { name: lang === 'hi' ? 'सफलताएं (Results)' : 'Results', href: '#results' },
    { name: lang === 'hi' ? 'संपर्क करें' : 'Contact & Map', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider animate-pulse">
              {lang === 'hi' ? 'नया बैच' : 'New Batch'}
            </span>
            <span className="text-slate-200">
              {lang === 'hi' 
                ? '🎯 एमपी सीपीसीटी एवं हाई कोर्ट स्पेशल टाइपिंग बैच प्रारंभ! सीमित सीटें उपलब्ध।' 
                : '🎯 New MP CPCT & High Court Target Typing Batches Starting! Limited Seats.'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-300 text-[11px]">
            <a 
              href="https://maps.google.com/?q=Boss+Computer+Typing+Institute+Kalapatha+Road+Betul" 
              target="_blank" 
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1 hover:text-amber-400 transition"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Kalapatha Road, Betul (M.P.)</span>
            </a>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-300" />
              <span>7 AM - 8 PM</span>
            </div>
            <a 
              href={`tel:${instituteInfo.phone.replace(/[^0-9+]/g, '')}`} 
              className="flex items-center gap-1 font-semibold text-amber-300 hover:text-white transition"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{instituteInfo.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Name */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
              <Keyboard className="w-6 h-6 text-amber-300" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight">
                  BOSS <span className="text-blue-600">COMPUTER</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  <Award className="w-3 h-3 text-amber-600" />
                  Betul, MP
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium -mt-0.5">
                {lang === 'hi' 
                  ? 'टाइपिंग एवं कंप्यूटर इंस्टीट्यूट • संस्कार चौक, कालापाठा' 
                  : '& Typing Institute • Kalapatha Road'}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition ${
                  link.special 
                    ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200' 
                    : 'text-slate-700 hover:text-blue-600 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs & Language Switcher */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:border-blue-500 bg-white hover:bg-blue-50/50 text-xs font-bold text-slate-700 transition"
              title="Toggle Hindi / English"
            >
              <Languages className="w-3.5 h-3.5 text-blue-600" />
              <span>{lang === 'en' ? 'हिंदी में देखें' : 'English'}</span>
            </button>

            {/* WhatsApp Direct */}
            <a
              href={`https://wa.me/${instituteInfo.whatsapp}?text=${encodeURIComponent(
                'Hello Boss Computer Betul! I want information regarding CPCT, Typing and Computer courses.'
              )}`}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 border border-emerald-200 transition"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-500 text-white" />
            </a>

            {/* Book Free Demo Button */}
            <button
              onClick={onOpenDemoModal}
              className="relative inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-500/25 transition active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{lang === 'hi' ? 'फ्री डेमो बुक करें' : 'Book Free Demo'}</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 px-2 py-1 rounded border border-slate-300 text-xs font-bold text-slate-700 bg-white"
            >
              <Languages className="w-3 h-3 text-blue-600" />
              <span>{lang === 'en' ? 'हिं' : 'EN'}</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold ${
                  link.special
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-bold text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{lang === 'hi' ? '2-दिन की फ्री डेमो क्लास बुक करें' : 'Book Free 2-Day Demo Class'}</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${instituteInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-xs text-slate-800 bg-slate-100 hover:bg-slate-200"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Call Center</span>
              </a>
              <a
                href={`https://wa.me/${instituteInfo.whatsapp}?text=${encodeURIComponent(
                  'Hello Boss Computer Betul! I want admission details.'
                )}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-xs text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
