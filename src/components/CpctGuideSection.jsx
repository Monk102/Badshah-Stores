import React, { useState } from 'react';
import { 
  FileCheck, 
  HelpCircle, 
  CheckCircle, 
  Download, 
  Award, 
  AlertTriangle, 
  Zap, 
  Laptop, 
  Keyboard, 
  ArrowRight,
  BookCheck,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { instituteInfo } from '../data/instituteData';

export default function CpctGuideSection({ onOpenDemoModal }) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState('pattern');

  return (
    <section id="cpct-guide" className="py-16 sm:py-24 bg-gradient-to-b from-slate-50 to-blue-50/40 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3 border border-amber-300">
            <Award className="w-4 h-4 text-amber-700" />
            <span>{lang === 'hi' ? 'सीपीसीटी परीक्षा संपूर्ण मार्गदर्शिका' : 'MP CPCT Complete Exam Blueprint'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {lang === 'hi' ? (
              <>
                मध्य प्रदेश <span className="text-blue-600">सीपीसीटी परीक्षा</span> क्या है और कैसे पास करें?
              </>
            ) : (
              <>
                Everything You Need to Know to <span className="text-blue-600">Crack MP CPCT</span> in 1st Attempt
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'hi'
              ? 'म.प्र. शासन द्वारा सीपीसीटी स्कोरकार्ड की मान्यता 7 वर्ष कर दी गई है। जानिए परीक्षा पैटर्न, न्यूनतम क्वालिफाइंग मार्क्स, और बॉस कंप्यूटर की गारंटीड तैयारी रणनीति।'
              : 'MP CPCT scorecards are now valid for 7 years! Discover the exact marking scheme, qualifying typing speeds, and Boss Computer Betul’s proven roadmap.'}
          </p>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            <button
              onClick={() => setActiveTab('pattern')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTab === 'pattern'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <FileCheck className="w-4 h-4" />
              <span>{lang === 'hi' ? 'परीक्षा पैटर्न एवं अंक' : 'Exam Pattern & Marks'}</span>
            </button>

            <button
              onClick={() => setActiveTab('typing-standards')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTab === 'typing-standards'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Keyboard className="w-4 h-4" />
              <span>{lang === 'hi' ? 'टाइपिंग नियम व स्पीड' : 'Typing Speed Standards'}</span>
            </button>

            <button
              onClick={() => setActiveTab('govt-jobs')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
                activeTab === 'govt-jobs'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>{lang === 'hi' ? 'मान्य सरकारी नौकरियां' : 'Eligible Govt Jobs'}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Exam Pattern */}
        {activeTab === 'pattern' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {/* Theory Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                  <Laptop className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Part 1: Multiple Choice Questions (75 Marks)
                </h3>
                <p className="text-xs text-slate-600 mb-4">
                  Total 75 MCQs conducted online. Qualifying minimum is <strong>38 Marks (50%)</strong> with NO negative marking!
                </p>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600">Computer Proficiency:</span>
                    <strong className="text-blue-700">52 Questions</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600">Reading Comprehension:</span>
                    <strong className="text-slate-800">5 Questions</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600">Quantitative Aptitude (Maths):</span>
                    <strong className="text-slate-800">6 Questions</strong>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <span className="text-slate-600">General Mental Ability (Reasoning):</span>
                    <strong className="text-slate-800">6 Questions</strong>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-600">General Awareness:</span>
                    <strong className="text-slate-800">6 Questions</strong>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 bg-blue-50/50 p-3 rounded-xl text-xs text-blue-900">
                💡 <strong>Boss Computer Advantage:</strong> Weekly mock test series with previous 8-year official MAP_IT question banks.
              </div>
            </div>

            {/* English Typing Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                  <Keyboard className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Part 2: English Typing Test (15 Mins)
                </h3>
                <p className="text-xs text-slate-600 mb-4">
                  Tested on screen paragraph with real-time timer.
                </p>

                <div className="space-y-3 text-xs">
                  <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100">
                    <div className="font-bold text-emerald-900 mb-1">Qualifying Cutoff:</div>
                    <div className="text-2xl font-black text-emerald-700">30 Net WPM</div>
                    <div className="text-[11px] text-emerald-800 mt-1">Minimum 85% Accuracy required</div>
                  </div>

                  <div className="space-y-1.5 text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>30 to 40 WPM = 50% Scale</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>41 to 50 WPM = 60% Scale</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                      <span>51+ WPM = 70%+ Highest Scale</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                ⚡ Boss Computer Betul average student score: <strong>42 Net WPM</strong>
              </div>
            </div>

            {/* Hindi Typing Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                  <BookCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Part 3: Hindi Typing Test (15 Mins)
                </h3>
                <p className="text-xs text-slate-600 mb-4">
                  Uses Unicode Mangal Font (Remington Gail / Inscript layout).
                </p>

                <div className="space-y-3 text-xs">
                  <div className="bg-amber-50 p-3 rounded-xl border border-amber-200">
                    <div className="font-bold text-amber-900 mb-1">Qualifying Cutoff:</div>
                    <div className="text-2xl font-black text-amber-700">20 Net WPM</div>
                    <div className="text-[11px] text-amber-800 mt-1">Minimum 85% Accuracy required</div>
                  </div>

                  <div className="space-y-1.5 text-slate-600">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>20 to 25 WPM = 50% Scale</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>26 to 30 WPM = 60% Scale</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-600" />
                      <span>31+ WPM = 70%+ Distinction</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500">
                ⚡ Remington Gail layout specialist lab in Betul
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Typing Standards & Keyboard Layouts */}
        {activeTab === 'typing-standards' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                  <Keyboard className="w-5 h-5 text-blue-600" />
                  Why Remington Gail is the Top Choice in Betul?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                  More than 95% of candidates appearing for MP CPCT and MP High Court choose the <strong>Remington Gail</strong> keyboard layout. If you have ever used Kruti Dev 010 in MP, Remington Gail is almost 90% identical in character placement!
                </p>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>No confusion with Inscript:</strong> Characters like ज्ञ, त्र, क्ष are formed with natural key sequences.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>High Court mandatory:</strong> MP District and High Court typing tests strictly test on Remington Gail.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Boss Computer Exclusive Software:</strong> Our in-house software disables the backspace key periodically to force muscle accuracy.</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" />
                    Exam Day Golden Tips by Boss Computer
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <p>1. Never look down at the keyboard — trust muscle memory.</p>
                    <p>2. Keep your wrists hovering comfortably; do not press your palms on the desk.</p>
                    <p>3. In the first 2 minutes of the test, type slowly to achieve 100% accuracy, then accelerate.</p>
                    <p>4. Always practice on standard mechanical full-size keyboards with deep key travel.</p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">Want daily 1-on-1 typing coaching?</span>
                  <button
                    onClick={onOpenDemoModal}
                    className="text-xs font-bold text-amber-300 hover:text-white underline"
                  >
                    Join Boss Computer Batch ➔
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Eligible Govt Jobs */}
        {activeTab === 'govt-jobs' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm animate-in fade-in duration-300">
            <h3 className="text-xl font-bold text-slate-900 mb-4">
              Where is the MP CPCT Scorecard Mandatory?
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: "MP Patwari Recruitment", role: "Revenue Department", requirement: "CPCT Scorecard + DCA/PGDCA" },
                { title: "MP High Court & District Courts", role: "Assistant Grade 3 & Steno", requirement: "Hindi Remington Gail (30+ WPM)" },
                { title: "Collectorate & Tehsil Office", role: "Data Entry Operator / AG-3", requirement: "CPCT (Theory + Typing)" },
                { title: "MP Nagar Nigam / Palika", role: "Office Assistant / Clerical", requirement: "CPCT Scorecard" },
                { title: "MP Police Sub-Inspector", role: "Stenographer / Ministerial", requirement: "Hindi/English Typing + CPCT" },
                { title: "Madhya Pradesh ESB (Vyapam)", role: "Combined Group-4 Exams", requirement: "CPCT Compulsory Qualification" },
              ].map((job, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-blue-400 transition">
                  <div className="font-bold text-slate-900 text-sm mb-1">{job.title}</div>
                  <div className="text-xs text-blue-700 font-semibold mb-2">{job.role}</div>
                  <div className="text-xs text-slate-600 bg-white p-2 rounded border border-slate-100">
                    Mandatory: <strong>{job.requirement}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action Banner */}
        <div className="mt-10 bg-gradient-to-r from-blue-700 to-indigo-700 text-white p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-extrabold mb-2">
              {lang === 'hi'
                ? 'क्या आप आगामी सीपीसीटी परीक्षा में 100% सफलता चाहते हैं?'
                : 'Targeting the Next MP CPCT Notification?'}
            </h3>
            <p className="text-blue-100 text-xs sm:text-sm">
              {lang === 'hi'
                ? 'बॉस कंप्यूटर कालापाठा रोड बैतूल में 2 दिन का फ्री ट्रायल बैच अटेंड करें। देखें अपनी वर्तमान स्पीड और परीक्षा उत्तीर्ण करने का सीधा प्लान।'
                : 'Join our special CPCT Target Batch at Kalapatha Road, Betul. Experience 2 days of free demo practice on exam-identical keyboards.'}
            </p>
          </div>

          <button
            onClick={onOpenDemoModal}
            className="px-6 py-3.5 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-lg shadow-amber-400/25 transition shrink-0 flex items-center gap-2"
          >
            <span>{lang === 'hi' ? 'फ्री डेमो क्लास बुक करें' : 'Book Free Demo Now'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
