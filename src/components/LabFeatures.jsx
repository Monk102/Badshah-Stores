import React from 'react';
import { 
  Monitor, 
  Keyboard, 
  Zap, 
  Gauge, 
  Wind, 
  Award, 
  CheckCircle, 
  ShieldCheck, 
  Users,
  Clock,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { labFeatures, instituteInfo } from '../data/instituteData';

export default function LabFeatures({ onOpenDemoModal }) {
  const { lang } = useLanguage();

  const iconMap = {
    Monitor: <Monitor className="w-6 h-6 text-blue-600" />,
    Keyboard: <Keyboard className="w-6 h-6 text-amber-500" />,
    Zap: <Zap className="w-6 h-6 text-yellow-500" />,
    Gauge: <Gauge className="w-6 h-6 text-emerald-500" />,
    Wind: <Wind className="w-6 h-6 text-sky-500" />,
    Award: <Award className="w-6 h-6 text-purple-500" />
  };

  return (
    <section id="facilities" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'hi' ? 'विश्वस्तरीय सुविधाएं' : 'Modern Infrastructure'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {lang === 'hi' ? (
              <>
                बैतूल की सबसे सुसज्जित <span className="text-blue-600">कंप्यूटर एवं टाइपिंग लैब</span>
              </>
            ) : (
              <>
                Betul's Best Equipped <span className="text-blue-600">Computer & Typing Lab</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'hi'
              ? 'संस्कार चौक, कालापाठा रोड पर स्थित हमारे केंद्र में विद्यार्थियों को परीक्षा हॉल जैसा वास्तविक वातावरण प्रदान किया जाता है ताकि परीक्षा के दिन कोई घबराहट न हो।'
              : 'Located on Kalapatha Road near Sanskar Chowk, our facility simulates real exam hall conditions with zero distractions and top-grade hardware.'}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {labFeatures.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-400 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                {iconMap[feat.icon] || <CheckCircle className="w-6 h-6 text-blue-600" />}
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {lang === 'hi' ? feat.hindiTitle : feat.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {lang === 'hi' ? feat.hindiDesc : feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Visual Lab Showcase Highlights */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Kalapatha Road Center Tour</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                {lang === 'hi'
                  ? 'व्यक्तिगत पीसी, व्यक्तिगत मार्गदर्शन — कोई शेयरिंग नहीं!'
                  : 'Individual Workstations, Dedicated Mentorship — Zero Waiting!'}
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'hi'
                  ? 'बॉस कंप्यूटर बैतूल में प्रत्येक नामांकित छात्र को अपना स्वतंत्र सिस्टम दिया जाता है। पूरे 60 से 120 मिनट केवल आपके हाथ कीबोर्ड पर रहते हैं। हमारे शिक्षक निरंतर आपकी उंगलियों की पोजीशन और स्पीड पर नज़र रखते हैं।'
                  : 'Unlike crowded centers, every enrolled student at Boss Computer Betul is assigned their own independent PC for the entire duration of their slot. Dedicated mentors continuously review finger dexterity, posture, and accuracy.'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
                  <div className="text-amber-400 font-bold text-lg">7:00 AM</div>
                  <div className="text-[11px] text-slate-300">First Morning Batch</div>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80">
                  <div className="text-blue-400 font-bold text-lg">8:00 PM</div>
                  <div className="text-[11px] text-slate-300">Late Evening Batch</div>
                </div>
                <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 col-span-2 sm:col-span-1">
                  <div className="text-emerald-400 font-bold text-lg">Sunday</div>
                  <div className="text-[11px] text-slate-300">Weekly Speed Mock</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-800/70 p-6 rounded-2xl border border-slate-700 flex flex-col justify-between space-y-4">
              <div>
                <h4 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-amber-400" />
                  Keyboards Ready for Testing:
                </h4>
                
                <div className="space-y-2.5 text-xs text-slate-300">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-700">
                    <span>TVS Gold Mechanical Tactile</span>
                    <span className="text-emerald-400 font-bold">Exam Standard</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-700">
                    <span>Dell Pro USB Keyboards</span>
                    <span className="text-emerald-400 font-bold">Smooth Travel</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-700">
                    <span>HP Multimedia Keyboards</span>
                    <span className="text-emerald-400 font-bold">High Durability</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-900/60 border border-slate-700">
                    <span>Logitech Silent & Fast Response</span>
                    <span className="text-emerald-400 font-bold">Ergonomic</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenDemoModal}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition flex items-center justify-center gap-2"
              >
                <span>{lang === 'hi' ? 'लैब विजिट करें एवं डेमो लें' : 'Visit Lab & Try 2-Day Demo'}</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
