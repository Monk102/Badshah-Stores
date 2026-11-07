import React, { useState } from 'react';
import { 
  BookOpen, 
  Clock, 
  Star, 
  CheckCircle2, 
  ArrowRight, 
  MessageCircle, 
  Sparkles, 
  FileText, 
  X,
  Target,
  GraduationCap
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { coursesData, instituteInfo } from '../data/instituteData';

export default function CoursesSection({ onOpenDemoModal }) {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const categories = [
    'All',
    'CPCT & Govt Exams',
    'Typing Certification',
    'University Diplomas',
    'Accounting & IT Skills'
  ];

  const filteredCourses = activeCategory === 'All'
    ? coursesData
    : coursesData.filter((c) => c.category === activeCategory);

  return (
    <section id="courses" className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <GraduationCap className="w-4 h-4 text-blue-600" />
            <span>{lang === 'hi' ? 'करियर उन्मुख पाठ्यक्रम' : 'Career Oriented Courses'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {lang === 'hi' ? (
              <>
                बॉस कंप्यूटर के <span className="text-blue-600">प्रमुख कोर्सेस</span>
              </>
            ) : (
              <>
                Explore Our <span className="text-blue-600">Professional Programs</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'hi'
              ? 'मध्य प्रदेश शासन की प्रतियोगी परीक्षाओं और निजी क्षेत्र की मांग के अनुसार तैयार किए गए प्रैक्टिकल कोर्सेस। हर विद्यार्थी के लिए व्यक्तिगत कंप्यूटर एवं मार्गदर्शन।'
              : 'Courses tailored for MP Government recruitments and high-paying private accounting jobs. 100% practical lab practice on modern workstations in Betul.'}
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'All' ? (lang === 'hi' ? 'सभी कोर्सेस (All)' : 'All Programs') : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              <div>
                {/* Card Top Banner */}
                <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-5 relative overflow-hidden">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950">
                      {course.badge}
                    </span>
                    <div className="flex items-center gap-1 text-amber-300 text-xs font-semibold">
                      <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span>{course.rating}</span>
                      <span className="text-slate-400">({course.students})</span>
                    </div>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                    {lang === 'hi' ? course.hindiTitle : course.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-blue-400" />
                      {course.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      {course.timing}
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 sm:p-6 space-y-4">
                  <p className="text-xs sm:text-sm text-slate-600 line-clamp-3">
                    {course.overview}
                  </p>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      {lang === 'hi' ? 'मुख्य विशेषताएं:' : 'Key Highlights:'}
                    </div>
                    {course.highlights.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Target Exam Tag */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-700">
                    <span className="font-bold text-slate-900 block mb-0.5 flex items-center gap-1">
                      <Target className="w-3.5 h-3.5 text-red-500" />
                      {lang === 'hi' ? 'उपयोगी परीक्षाएं / नौकरी:' : 'Career / Target Exams:'}
                    </span>
                    <span className="text-slate-600 font-medium">{course.targetExam}</span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 sm:p-6 pt-0 flex flex-col gap-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedCourse(course)}
                    className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{lang === 'hi' ? 'सिलेबस देखें' : 'View Syllabus'}</span>
                  </button>

                  <button
                    onClick={onOpenDemoModal}
                    className="flex items-center justify-center gap-1 px-3 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 transition shadow-sm"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{lang === 'hi' ? 'फ्री डेमो लें' : 'Free Demo'}</span>
                  </button>
                </div>

                <a
                  href={`https://wa.me/${instituteInfo.whatsapp}?text=${encodeURIComponent(
                    `Hello Boss Computer Betul! I am interested in joining "${course.title}". Please send me fee structure and batch timings.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'hi' ? 'व्हाट्सएप पर फीस व समय पूछें' : 'Inquire Fee on WhatsApp'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Course Details Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-200 relative">
              
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white p-6 sticky top-0 z-10 flex items-start justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{selectedCourse.category}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    {lang === 'hi' ? selectedCourse.hindiTitle : selectedCourse.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-slate-300">
                    <span>⏱️ Duration: <strong>{selectedCourse.duration}</strong></span>
                    <span>📍 Batch: <strong>{selectedCourse.timing}</strong></span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCourse(null)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">
                    {lang === 'hi' ? 'पाठ्यक्रम का विवरण:' : 'Course Overview:'}
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedCourse.overview}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    {lang === 'hi' ? 'सिलेबस एवं अध्ययन बिंदु:' : 'Complete Syllabus & Practical Points:'}
                  </h4>
                  <div className="space-y-2.5">
                    {selectedCourse.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs sm:text-sm text-slate-800">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-blue-50/60 p-4 rounded-xl border border-blue-100">
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">🎯 Target Recruitment:</span>
                    <span className="text-slate-700">{selectedCourse.targetExam}</span>
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block mb-1">🎓 Eligibility / Prerequisite:</span>
                    <span className="text-slate-700">{selectedCourse.prerequisite}</span>
                  </div>
                </div>

                {/* Modal CTA Buttons */}
                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-end gap-3">
                  <a
                    href={`https://wa.me/${instituteInfo.whatsapp}?text=${encodeURIComponent(
                      `Hello Boss Computer Betul! I am interested in enrolling in "${selectedCourse.title}". Please guide me with current batch timings and fee concession.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md transition"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Inquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      setSelectedCourse(null);
                      onOpenDemoModal();
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md transition"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Book 2-Day Free Demo</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
