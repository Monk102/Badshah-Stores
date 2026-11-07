import React, { useState } from 'react';
import { 
  Trophy, 
  Star, 
  Quote, 
  MapPin, 
  CheckCircle2, 
  Award,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { testimonialsData, instituteInfo } from '../data/instituteData';

export default function ResultsWall() {
  const { lang } = useLanguage();
  const [filter, setFilter] = useState('All');

  return (
    <section id="results" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-300">
            <Trophy className="w-4 h-4 text-amber-600" />
            <span>{lang === 'hi' ? 'सफलता की गौरवगाथा' : 'Wall of Fame'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {lang === 'hi' ? (
              <>
                बैतूल के सफल विद्यार्थियों के <span className="text-blue-600">वास्तविक अनुभव</span>
              </>
            ) : (
              <>
                Real Success Stories from <span className="text-blue-600">Betul's Aspirants</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'hi'
              ? '4,200 से अधिक छात्र बॉस कंप्यूटर से प्रशिक्षण लेकर मध्य प्रदेश शासन के विभिन्न विभागों में पदस्थ हैं। पढ़िए उनका सफरनामा।'
              : 'Over 4,200 students from Boss Computer Betul have successfully qualified CPCT and joined MP government services and private firms.'}
          </p>

          {/* Social Proof Badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-800">
              <span className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </span>
              <span>4.8 / 5 Rating on Justdial</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-800">
              <Award className="w-4 h-4 text-blue-600" />
              <span>98% First Attempt CPCT Pass Ratio</span>
            </div>

            <a
              href="https://www.justdial.com/Betul/Boss-Computer-Typing-Institute-Boss-Computer-Kalapatha-Road/9999P7141-7141-171201142319-S8F1_BZDET"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-50 border border-blue-200 text-xs font-bold text-blue-700 hover:bg-blue-100 transition"
            >
              <span>View Justdial Business Profile</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {testimonialsData.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-10 h-10 text-blue-100 absolute top-6 right-6 pointer-events-none group-hover:text-blue-200 transition-colors" />

              <div>
                {/* Score Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{item.score}</span>
                </div>

                {/* Testimonial Quote */}
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                  "{lang === 'hi' ? item.hindiText : item.text}"
                </p>
              </div>

              {/* Student Info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-900 text-base">
                    {lang === 'hi' ? item.hindiName : item.name}
                  </h4>
                  <div className="text-xs font-semibold text-blue-600 mt-0.5">
                    {item.role}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                  <MapPin className="w-3 h-3 text-red-500" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Local Betul Localities Served Banner */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 text-center">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            Welcoming Aspirants from Across Betul District:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-700">
            {['Kalapatha', 'Sanskar Chowk', 'Kothi Bazar', 'Ganj Betul', 'Badnoor', 'Sadar', 'Bharat Bharti', 'Sanjay Colony', 'Tikari', 'Multai', 'Amla', 'Shahpur', 'Bhainsdehi'].map((loc, i) => (
              <span key={i} className="bg-slate-100 px-3 py-1 rounded-lg border border-slate-200">
                📍 {loc}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
