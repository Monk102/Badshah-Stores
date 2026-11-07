import React, { useState } from 'react';
import { 
  Keyboard, 
  Award, 
  CheckCircle2, 
  MapPin, 
  ArrowRight, 
  Star, 
  Users, 
  Zap, 
  ShieldCheck, 
  BookOpen, 
  Laptop,
  GraduationCap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { instituteInfo } from '../data/instituteData';

export default function Hero({ onOpenDemoModal, onScrollToSection }) {
  const { lang } = useLanguage();
  const [selectedGoal, setSelectedGoal] = useState('cpct');

  const goals = [
    { id: 'cpct', label: lang === 'hi' ? 'सीपीसीटी परीक्षा पास करना' : 'Pass CPCT Exam', target: '#typing-test', course: 'MP CPCT Complete Prep (Hindi & English)' },
    { id: 'govt-job', label: lang === 'hi' ? 'सरकारी नौकरी (पटवारी / हाई कोर्ट)' : 'Govt Jobs (Patwari / High Court)', target: '#courses', course: 'High Court AG-III & Hindi Typing (Remington Gail)' },
    { id: 'diploma', label: lang === 'hi' ? 'मान्यता प्राप्त डिप्लोमा (DCA / PGDCA)' : 'Recognized Diploma (DCA / PGDCA)', target: '#courses', course: 'MCU Syllabus 1-Year DCA / PGDCA Diploma' },
    { id: 'accounting', label: lang === 'hi' ? 'प्राइवेट जॉब / अकाउंटिंग (Tally)' : 'Accounting & Tally Prime', target: '#courses', course: 'Tally Prime with Practical GST & E-Way Bill' }
  ];

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Trust Pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-200 text-xs sm:text-sm font-medium backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{lang === 'hi' ? 'संस्कार चौक, कालापाठा रोड, बैतूल (म.प्र.)' : 'Kalapatha Road, Near Sanskar Chowk, Betul (M.P.)'}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.8★ (320+ Betul Reviews on Justdial & Google)</span>
          </div>
        </div>

        {/* Hero Headings */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4 sm:mb-6">
            {lang === 'hi' ? (
              <>
                बैतूल का नंबर #1 संस्थान <br />
                <span className="bg-gradient-to-r from-amber-300 via-blue-300 to-sky-200 bg-clip-text text-transparent">
                  सीपीसीटी, कंप्यूटर एवं टाइपिंग
                </span>{' '}
                की संपूर्ण तैयारी
              </>
            ) : (
              <>
                Betul's Most Trusted Institute for <br />
                <span className="bg-gradient-to-r from-amber-300 via-blue-300 to-sky-200 bg-clip-text text-transparent">
                  CPCT, DCA, PGDCA & Typing
                </span>{' '}
                Mastery
              </>
            )}
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-8">
            {lang === 'hi'
              ? 'मध्य प्रदेश की समस्त सरकारी नौकरियों (पटवारी, हाई कोर्ट, स्टेनोग्राफर, क्लर्क) हेतु हिंदी (मंगल रेमिंगटन गेल) एवं इंग्लिश टाइपिंग में गारंटीड स्पीड हासिल करें। साथ ही मान्यता प्राप्त DCA, PGDCA और टैली प्राइम।'
              : 'Master Hindi (Mangal Remington Gail) & English touch typing with exam-identical software. Top-tier training for MP CPCT, DCA, PGDCA, and Tally Prime with GST by Betul’s veteran instructors.'}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <a
              href="#typing-test"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 shadow-lg shadow-amber-400/20 transition transform hover:-translate-y-0.5"
            >
              <Keyboard className="w-5 h-5 text-slate-950" />
              <span>{lang === 'hi' ? 'मुफ्त लाइव टाइपिंग टेस्ट दें' : 'Take Free Live Typing Test'}</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenDemoModal}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 border border-blue-400/30 shadow-lg shadow-blue-600/30 transition transform hover:-translate-y-0.5"
            >
              <GraduationCap className="w-5 h-5 text-amber-300" />
              <span>{lang === 'hi' ? '2-दिन की फ्री डेमो क्लास बुक करें' : 'Book Free 2-Day Demo Class'}</span>
            </button>

            <a
              href="#courses"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition"
            >
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>{lang === 'hi' ? 'कोर्स एवं फीस देखें' : 'View Courses & Fees'}</span>
            </a>
          </div>

          {/* Interactive Fast Goal Finder Bar */}
          <div className="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 backdrop-blur-lg shadow-2xl max-w-3xl mx-auto text-left">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-700/60 mb-3">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                {lang === 'hi' ? 'आपका लक्ष्य क्या है? (त्वरित मार्गदर्शन)' : 'What is your goal? (Instant Course Advisor)'}
              </span>
              <span className="text-xs text-slate-400">
                {lang === 'hi' ? '1-क्लिक में उपयुक्त बैच चुनें' : 'Select to find recommended batch'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setSelectedGoal(g.id)}
                  className={`flex items-center justify-between p-2.5 rounded-lg text-xs sm:text-sm font-medium transition text-left ${
                    selectedGoal === g.id
                      ? 'bg-blue-600/30 text-white border border-blue-400 font-semibold'
                      : 'bg-slate-900/60 text-slate-300 border border-slate-700/50 hover:bg-slate-700/40'
                  }`}
                >
                  <span className="truncate mr-2">{g.label}</span>
                  {selectedGoal === g.id && <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />}
                </button>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-blue-950/60 p-3 rounded-xl border border-blue-800/40">
              <div className="text-xs sm:text-sm">
                <span className="text-slate-400 mr-2">{lang === 'hi' ? 'अनुशंसित कोर्स:' : 'Recommended:'}</span>
                <span className="font-bold text-amber-300">
                  {goals.find((g) => g.id === selectedGoal)?.course}
                </span>
              </div>
              <a
                href={goals.find((g) => g.id === selectedGoal)?.target}
                className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-3.5 py-1.5 rounded-lg transition shrink-0"
              >
                <span>{lang === 'hi' ? 'विवरण देखें' : 'Details'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Metric Badges Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mb-1">{instituteInfo.studentsTrained}</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">
              {lang === 'hi' ? 'बैतूल के प्रशिक्षित विद्यार्थी' : 'Students Trained in Betul'}
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mb-1">{instituteInfo.cpctSelections}</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">
              {lang === 'hi' ? 'सीपीसीटी क्वालिफाइड छात्र' : 'CPCT Qualified Aspirants'}
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mb-1">50+ PCs</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">
              {lang === 'hi' ? 'आधुनिक कंप्यूटर एवं कीबोर्ड्स' : 'Dedicated High-Speed PCs'}
            </div>
          </div>

          <div className="bg-slate-800/60 border border-slate-700/60 rounded-xl p-4 text-center backdrop-blur-sm">
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 mb-1">15+ Years</div>
            <div className="text-xs sm:text-sm text-slate-300 font-medium">
              {lang === 'hi' ? 'विश्वसनीयता एवं उत्कृष्टता' : 'Of Excellence in Betul'}
            </div>
          </div>
        </div>

        {/* Feature Highlights Ticker */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>{lang === 'hi' ? '100% प्रैक्टिकल कंप्यूटर लैब' : '100% Practical Computer Lab'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-400" />
            <span>{lang === 'hi' ? 'रेमिंगटन गेल एवं कृतिदेव कीबोर्ड्स' : 'Remington Gail & Kruti Dev Setup'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>{lang === 'hi' ? 'प्रतिदिन 15 मिनट का सीपीसीटी टेस्ट' : 'Daily 15-Min Official Exam Mocks'}</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>{lang === 'hi' ? 'व्यक्तिगत स्पीड मॉनिटरिंग' : 'Personal 1-on-1 Speed Guidance'}</span>
          </div>
        </div>

      </div>
    </section>
  );
}
