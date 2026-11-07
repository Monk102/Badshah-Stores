import React from 'react';
import { 
  Keyboard, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Heart, 
  ArrowUp, 
  ExternalLink,
  MessageCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { instituteInfo, coursesData } from '../data/instituteData';

export default function Footer({ onOpenDemoModal }) {
  const { lang } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm border-t border-slate-800 pb-20 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
            
            {/* Col 1 & 2: Brand Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md">
                  <Keyboard className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <div className="font-extrabold text-lg text-white tracking-tight">
                    BOSS COMPUTER
                  </div>
                  <div className="text-[11px] text-blue-400 font-medium -mt-1">
                    & Typing Institute • Betul (M.P.)
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {lang === 'hi'
                  ? 'बॉस कंप्यूटर एवं टाइपिंग इंस्टीट्यूट, कालापाठा रोड, बैतूल। मध्य प्रदेश शासन की समस्त प्रतियोगी परीक्षाओं हेतु समर्पित कंप्यूटर एवं टाइपिंग प्रशिक्षण केंद्र।'
                  : 'Boss Computer & Typing Institute on Kalapatha Road is Betul’s foremost skill center for MP CPCT, DCA, PGDCA, Tally Prime with GST, and Hindi/English speed typing.'}
              </p>

              <div className="pt-1 flex flex-wrap gap-2 text-[11px]">
                <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 text-slate-300">
                  Est. {instituteInfo.establishedYear}
                </span>
                <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 text-amber-400 font-semibold">
                  ★ 4.8 Rating
                </span>
                <span className="bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 text-emerald-400 font-semibold">
                  4,200+ CPCT Qualified
                </span>
              </div>
            </div>

            {/* Col 3: Key Programs */}
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-4">
                Popular Courses
              </h4>
              <ul className="space-y-2 text-xs">
                {coursesData.slice(0, 5).map((course) => (
                  <li key={course.id}>
                    <a
                      href="#courses"
                      className="text-slate-400 hover:text-white transition line-clamp-1"
                    >
                      {course.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Quick Links */}
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-4">
                Quick Navigation
              </h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" className="hover:text-white transition">Home</a></li>
                <li><a href="#courses" className="hover:text-white transition">All Courses & Fees</a></li>
                <li><a href="#typing-test" className="text-amber-400 hover:underline font-semibold">Live Typing Test Simulator</a></li>
                <li><a href="#cpct-guide" className="hover:text-white transition">MP CPCT Complete Guide</a></li>
                <li><a href="#facilities" className="hover:text-white transition">Computer Lab & Facilities</a></li>
                <li><a href="#results" className="hover:text-white transition">Betul Student Results</a></li>
                <li><a href="#contact" className="hover:text-white transition">Contact & Map</a></li>
              </ul>
            </div>

            {/* Col 5: Local Betul Info */}
            <div>
              <h4 className="font-bold text-white uppercase text-xs tracking-wider mb-4">
                Betul Center
              </h4>
              <div className="space-y-2.5 text-xs text-slate-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>Near Sanskar Chowk, Kalapatha Road, Betul - 460001</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a href={`tel:${instituteInfo.phone.replace(/[^0-9+]/g, '')}`} className="text-white hover:underline font-bold">
                    {instituteInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                  <span>7:00 AM - 8:00 PM (Mon-Sat)</span>
                </div>
                
                <div className="pt-2">
                  <a
                    href="https://www.justdial.com/Betul/Boss-Computer-Typing-Institute-Boss-Computer-Kalapatha-Road/9999P7141-7141-171201142319-S8F1_BZDET"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 hover:text-blue-300"
                  >
                    <span>Justdial Business Listing</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
            <div className="text-slate-500 text-center sm:text-left">
              © {new Date().getFullYear()} Boss Computer & Typing Institute, Betul (M.P.). All rights reserved.
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white transition border border-slate-800 text-xs"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </footer>

      {/* Floating Bottom Quick Action Bar on Mobile */}
      <div className="fixed bottom-0 inset-x-0 z-40 sm:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800 p-2.5 px-4 flex items-center justify-between gap-2 shadow-2xl">
        <a
          href={`tel:${instituteInfo.phone.replace(/[^0-9+]/g, '')}`}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-slate-800 text-white font-bold text-xs border border-slate-700"
        >
          <Phone className="w-4 h-4 text-blue-400" />
          <span>Call Now</span>
        </a>

        <a
          href={`https://wa.me/${instituteInfo.whatsapp}?text=${encodeURIComponent(
            'Hello Boss Computer Betul! I want admission details.'
          )}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp</span>
        </a>

        <a
          href="#typing-test"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs shadow"
        >
          <Keyboard className="w-4 h-4" />
          <span>Test Speed</span>
        </a>
      </div>
    </>
  );
}
