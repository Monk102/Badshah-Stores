import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { faqData, instituteInfo } from '../data/instituteData';

export default function FaqSection({ onOpenDemoModal }) {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span>{lang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल' : 'Frequently Asked Questions'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {lang === 'hi' ? (
              <>
                सीपीसीटी एवं प्रवेश से संबंधित <span className="text-blue-600">आपके प्रश्न</span>
              </>
            ) : (
              <>
                Got Questions? <span className="text-blue-600">We Have Answers</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-sm sm:text-base">
            {lang === 'hi'
              ? 'बैतूल के विद्यार्थियों एवं अभिभावकों के मन में आने वाले आम सवाल और उनके स्पष्ट उत्तर।'
              : 'Clear, transparent answers regarding typing standards, exam patterns, fees, and batch schedules.'}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 text-left bg-white hover:bg-slate-50 flex items-center justify-between gap-4 transition"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base">
                    {lang === 'hi' ? faq.hindiQ : faq.q}
                  </span>
                  <div
                    className={`p-1.5 rounded-full bg-slate-100 text-slate-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 bg-blue-100 text-blue-700' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/50 border-t border-slate-100 animate-in fade-in duration-200">
                    <p className="mt-3">
                      {lang === 'hi' ? faq.hindiA : faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions banner */}
        <div className="mt-10 p-6 rounded-2xl bg-blue-50 border border-blue-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              {lang === 'hi' ? 'क्या आपका कोई अन्य प्रश्न है?' : 'Still have more questions?'}
            </h4>
            <p className="text-xs text-slate-600">
              {lang === 'hi' ? 'सीधे हमारे सेंटर काउंसलर से बात करें या व्हाट्सएप करें।' : 'Speak directly with our counselor at Kalapatha Road, Betul.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${instituteInfo.phone.replace(/[^0-9+]/g, '')}`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-white border border-slate-300 hover:bg-slate-100 shadow-sm transition"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" />
              <span>Call: {instituteInfo.phone}</span>
            </a>

            <button
              onClick={onOpenDemoModal}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Free Demo</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
