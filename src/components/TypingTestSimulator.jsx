import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Keyboard, 
  RotateCcw, 
  Clock, 
  Gauge, 
  CheckCircle, 
  AlertCircle, 
  Trophy, 
  Share2, 
  Sparkles, 
  HelpCircle,
  Volume2,
  VolumeX
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { typingPassages, instituteInfo } from '../data/instituteData';

export default function TypingTestSimulator({ onOpenDemoModal }) {
  const { lang } = useLanguage();

  const [testLanguage, setTestLanguage] = useState('english'); // 'english' | 'hindi'
  const [duration, setDuration] = useState(60); // 60, 120, 300
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const [passageIndex, setPassageIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  
  // Real-time calculation states
  const [grossWpm, setGrossWpm] = useState(0);
  const [netWpm, setNetWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [errorCount, setErrorCount] = useState(0);

  const [showAltSheet, setShowAltSheet] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const inputRef = useRef(null);
  const timerRef = useRef(null);

  // Get current passage text
  const currentPassages = typingPassages[testLanguage] || typingPassages.english;
  const currentText = currentPassages[passageIndex % currentPassages.length].text;

  // Sound synthesizer for realistic mechanical keyboard click
  const playClickSound = (isError = false) => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = isError ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(isError ? 180 : 600 + Math.random() * 200, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext not allowed or unsupported
    }
  };

  // Reset test
  const resetTest = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(duration);
    setUserInput('');
    setGrossWpm(0);
    setNetWpm(0);
    setAccuracy(100);
    setErrorCount(0);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Switch language or duration
  const handleLanguageChange = (newLang) => {
    setTestLanguage(newLang);
    setUserInput('');
    setIsActive(false);
    setIsFinished(false);
    setTimeLeft(duration);
  };

  const handleDurationChange = (newDuration) => {
    setDuration(newDuration);
    setTimeLeft(newDuration);
    setUserInput('');
    setIsActive(false);
    setIsFinished(false);
  };

  const switchPassage = () => {
    setPassageIndex((prev) => (prev + 1) % currentPassages.length);
    resetTest();
  };

  // Handle typing input
  const handleInputChange = (e) => {
    const value = e.target.value;

    if (isFinished) return;

    if (!isActive && value.length > 0) {
      setIsActive(true);
    }

    const lastChar = value[value.length - 1];
    const expectedChar = currentText[value.length - 1];
    playClickSound(lastChar !== expectedChar);

    setUserInput(value);

    // Calculate errors
    let errors = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== currentText[i]) {
        errors++;
      }
    }
    setErrorCount(errors);

    // Stop if user typed entire passage
    if (value.length >= currentText.length) {
      finishTest(value, errors, timeLeft);
    }
  };

  // Finish test
  const finishTest = (finalInput = userInput, finalErrors = errorCount, finalTimeLeft = timeLeft) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setIsFinished(true);

    const timeSpentMinutes = Math.max((duration - finalTimeLeft) / 60, 0.05);
    const totalChars = finalInput.length;
    const wordsTyped = totalChars / 5;

    const calculatedGrossWpm = Math.round(wordsTyped / timeSpentMinutes);
    const calculatedNetWpm = Math.max(0, Math.round((wordsTyped - finalErrors) / timeSpentMinutes));
    const calculatedAcc = totalChars > 0 ? Math.max(0, Math.round(((totalChars - finalErrors) / totalChars) * 100)) : 100;

    setGrossWpm(calculatedGrossWpm);
    setNetWpm(calculatedNetWpm);
    setAccuracy(calculatedAcc);

    // CPCT pass criteria: English >= 30 WPM, Hindi >= 20 WPM, Accuracy >= 85%
    const isPassing = testLanguage === 'english'
      ? calculatedNetWpm >= 30 && calculatedAcc >= 85
      : calculatedNetWpm >= 20 && calculatedAcc >= 85;

    if (isPassing) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  // Timer effect
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            finishTest(userInput, errorCount, 0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft, userInput, errorCount]);

  // Compute live WPM during test
  useEffect(() => {
    if (isActive && userInput.length > 0) {
      const timeSpentMinutes = Math.max((duration - timeLeft) / 60, 0.05);
      const wordsTyped = userInput.length / 5;
      const gWpm = Math.round(wordsTyped / timeSpentMinutes);
      const nWpm = Math.max(0, Math.round((wordsTyped - errorCount) / timeSpentMinutes));
      const acc = userInput.length > 0 ? Math.max(0, Math.round(((userInput.length - errorCount) / userInput.length) * 100)) : 100;

      setGrossWpm(gWpm);
      setNetWpm(nWpm);
      setAccuracy(acc);
    }
  }, [userInput, timeLeft, isActive, duration, errorCount]);

  const targetWpm = testLanguage === 'english' ? 30 : 20;
  const isCpctQualified = netWpm >= targetWpm && accuracy >= 85;

  // Render passage characters
  const renderHighlightedPassage = () => {
    return currentText.split('').map((char, index) => {
      let colorClass = 'text-slate-500';
      let bgClass = '';
      const isCurrentChar = index === userInput.length;

      if (index < userInput.length) {
        if (userInput[index] === char) {
          colorClass = 'text-emerald-700 bg-emerald-50';
        } else {
          colorClass = 'text-red-700 bg-red-100 font-bold';
        }
      }

      return (
        <span
          key={index}
          className={`${colorClass} ${bgClass} ${isCurrentChar ? 'border-b-2 border-blue-600 animate-pulse bg-blue-100/60 font-semibold text-slate-900' : ''}`}
        >
          {char}
        </span>
      );
    });
  };

  return (
    <section id="typing-test" className="py-16 sm:py-20 bg-slate-100 text-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Keyboard className="w-4 h-4 text-blue-600" />
            <span>{lang === 'hi' ? 'एमपी सीपीसीटी परीक्षा सिम्युलेटर' : 'MP CPCT Exam Simulator'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
            {lang === 'hi' ? (
              <>
                अपनी <span className="text-blue-600">टाइपिंग स्पीड व शुद्धता</span> की मुफ्त जांच करें
              </>
            ) : (
              <>
                Test Your <span className="text-blue-600">Typing Speed & Accuracy</span> Free
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-slate-600">
            {lang === 'hi'
              ? 'बिल्कुल सीपीसीटी और व्यापम परीक्षा जैसी टाइमिंग और नेट स्पीड गणना। इंग्लिश (30 WPM) एवं हिंदी मंगल (20 WPM) में अपनी तैयारी परखें।'
              : 'Exact MP CPCT & Vyapam exam scoring algorithm. Test whether you qualify for government jobs with live Net WPM and accuracy feedback.'}
          </p>
        </div>

        {/* Test Simulator Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Top Control Bar */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
            
            {/* Language Switcher for Typing */}
            <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
              <button
                onClick={() => handleLanguageChange('english')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  testLanguage === 'english'
                    ? 'bg-blue-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>English CPCT (30 WPM)</span>
              </button>
              <button
                onClick={() => handleLanguageChange('hindi')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                  testLanguage === 'hindi'
                    ? 'bg-amber-500 text-slate-950 shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span>हिंदी मंगल (20 WPM)</span>
              </button>
            </div>

            {/* Duration Selector */}
            <div className="flex items-center gap-1.5 bg-slate-800 px-2 py-1 rounded-xl border border-slate-700 text-xs">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-slate-400 font-medium mr-1">{lang === 'hi' ? 'समय:' : 'Timer:'}</span>
              {[60, 120, 300].map((sec) => (
                <button
                  key={sec}
                  onClick={() => handleDurationChange(sec)}
                  className={`px-2.5 py-1 rounded-md font-semibold transition ${
                    duration === sec
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {sec === 60 ? '1 Min' : sec === 120 ? '2 Min' : '5 Min'}
                </button>
              ))}
            </div>

            {/* Utility Actions (Sound toggle, Alt sheet, Reset) */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 text-xs flex items-center gap-1 border border-slate-700"
                title={soundEnabled ? 'Mute keyboard sound' : 'Unmute keyboard sound'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
              </button>

              <button
                onClick={() => setShowAltSheet(!showAltSheet)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 border border-slate-700"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                <span>{lang === 'hi' ? 'रेमिंगटन शॉर्टकट्स' : 'Remington Alt Codes'}</span>
              </button>

              <button
                onClick={resetTest}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'hi' ? 'रीसेट' : 'Reset'}</span>
              </button>
            </div>
          </div>

          {/* Alt Code Cheat Sheet popup if open */}
          {showAltSheet && (
            <div className="bg-amber-50 border-b border-amber-200 p-4 text-xs text-amber-900 transition-all">
              <div className="font-bold flex items-center justify-between mb-2">
                <span>📌 Important Mangal Remington Gail Alt Codes (Boss Computer Betul Study Notes):</span>
                <button onClick={() => setShowAltSheet(false)} className="text-amber-700 hover:text-amber-950 font-bold">✕ Close</button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 text-slate-800">
                <div className="bg-white p-1.5 rounded border border-amber-200"><span className="font-bold text-blue-700">Alt + 0216</span> = क्र</div>
                <div className="bg-white p-1.5 rounded border border-amber-200"><span className="font-bold text-blue-700">Alt + 0170</span> = द्ध</div>
                <div className="bg-white p-1.5 rounded border border-amber-200"><span className="font-bold text-blue-700">Alt + 0204</span> = त्र</div>
                <div className="bg-white p-1.5 rounded border border-amber-200"><span className="font-bold text-blue-700">Alt + 0217</span> = ज्ञ</div>
                <div className="bg-white p-1.5 rounded border border-amber-200"><span className="font-bold text-blue-700">Alt + 0188</span> = द्व</div>
                <div className="bg-white p-1.5 rounded border border-amber-200"><span className="font-bold text-blue-700">Alt + 0161</span> = चंद्रबिंदु ँ</div>
              </div>
            </div>
          )}

          {/* Live Performance Dashboard Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-slate-200 border-b border-slate-200 text-center">
            <div className="bg-white p-3 sm:p-4">
              <div className="text-xs uppercase text-slate-500 font-semibold mb-1">Time Remaining</div>
              <div className={`text-2xl sm:text-3xl font-extrabold ${timeLeft <= 10 && isActive ? 'text-red-600 animate-pulse' : 'text-slate-900'}`}>
                {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4">
              <div className="text-xs uppercase text-slate-500 font-semibold mb-1">Net WPM (Exam Speed)</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">
                {netWpm}
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4">
              <div className="text-xs uppercase text-slate-500 font-semibold mb-1">Gross WPM</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                {grossWpm}
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4">
              <div className="text-xs uppercase text-slate-500 font-semibold mb-1">Accuracy</div>
              <div className={`text-2xl sm:text-3xl font-extrabold ${accuracy >= 85 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {accuracy}%
              </div>
            </div>

            <div className="bg-white p-3 sm:p-4 col-span-2 sm:col-span-1">
              <div className="text-xs uppercase text-slate-500 font-semibold mb-1">Errors</div>
              <div className={`text-2xl sm:text-3xl font-extrabold ${errorCount > 0 ? 'text-red-500' : 'text-slate-700'}`}>
                {errorCount}
              </div>
            </div>
          </div>

          {/* Passage Display Area */}
          <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between mb-3 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">
                {lang === 'hi' ? 'पैराग्राफ विषय:' : 'Passage Title:'}{' '}
                <span className="text-blue-700 font-bold">
                  {currentPassages[passageIndex % currentPassages.length].title}
                </span>
              </span>
              <button
                onClick={switchPassage}
                className="text-blue-600 hover:text-blue-800 font-semibold underline text-xs"
              >
                {lang === 'hi' ? 'दूसरा पैराग्राफ बदलें ➔' : 'Change Passage ➔'}
              </button>
            </div>

            <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 text-base sm:text-lg leading-relaxed tracking-wide font-hindi min-h-[140px] max-h-[220px] overflow-y-auto select-none shadow-inner">
              {renderHighlightedPassage()}
            </div>
          </div>

          {/* Input Box Area */}
          <div className="p-5 sm:p-6 bg-white">
            {!isFinished ? (
              <div>
                <textarea
                  ref={inputRef}
                  value={userInput}
                  onChange={handleInputChange}
                  disabled={isFinished}
                  rows={3}
                  placeholder={
                    testLanguage === 'hindi'
                      ? 'यहाँ टाइप करना शुरू करें (टाइप करते ही टाइमर चालू हो जाएगा)...'
                      : 'Start typing here (the timer will begin automatically with your first keystroke)...'
                  }
                  className="w-full p-4 rounded-xl border-2 border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-100 outline-none text-base sm:text-lg text-slate-900 transition resize-none font-hindi"
                />
                
                <div className="flex flex-wrap items-center justify-between gap-2 mt-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-ping" />
                    {isActive ? '⏱️ Test in progress...' : '👉 Click the box above and start typing.'}
                  </span>
                  
                  <span className="font-medium text-slate-600">
                    Target: <strong className="text-blue-700">{targetWpm} Net WPM</strong> with <strong className="text-emerald-700">85%+ Accuracy</strong> for CPCT qualification.
                  </span>
                </div>
              </div>
            ) : (
              /* Completed Score Card */
              <div className="p-6 bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-2xl border border-blue-800 text-center shadow-xl animate-in fade-in duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-400 text-slate-950 mb-3">
                  <Trophy className="w-8 h-8" />
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold mb-1">
                  {isCpctQualified ? (
                    <span className="text-emerald-400">🎉 Congratulations! You Met the MP CPCT Benchmark!</span>
                  ) : (
                    <span className="text-amber-300">⚡ Good Effort! Practice Needed for CPCT Benchmark</span>
                  )}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto mb-6">
                  {isCpctQualified
                    ? `You achieved ${netWpm} Net WPM with ${accuracy}% accuracy in ${testLanguage.toUpperCase()}, which clears the official MP CPCT qualifying cutoff (${targetWpm} WPM).`
                    : `You reached ${netWpm} Net WPM. MP CPCT requires minimum ${targetWpm} Net WPM and 85% accuracy. Boss Computer Betul offers speed booster batches to elevate your speed to 45+ WPM!`}
                </p>

                {/* Stat pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto mb-6">
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <div className="text-xs text-slate-400 uppercase">Net Speed</div>
                    <div className="text-2xl font-bold text-amber-400">{netWpm} WPM</div>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <div className="text-xs text-slate-400 uppercase">Gross Speed</div>
                    <div className="text-2xl font-bold text-white">{grossWpm} WPM</div>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <div className="text-xs text-slate-400 uppercase">Accuracy</div>
                    <div className="text-2xl font-bold text-emerald-400">{accuracy}%</div>
                  </div>
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700">
                    <div className="text-xs text-slate-400 uppercase">Errors</div>
                    <div className="text-2xl font-bold text-red-400">{errorCount}</div>
                  </div>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={resetTest}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold transition"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Again</span>
                  </button>

                  <a
                    href={`https://wa.me/${instituteInfo.whatsapp}?text=${encodeURIComponent(
                      `Hello Boss Computer Betul! I just took the online typing speed test: Net Speed = ${netWpm} WPM, Accuracy = ${accuracy}%. I want to join your institute at Kalapatha Road to prepare for CPCT and High Court.`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 transition"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Score & Inquire on WhatsApp</span>
                  </a>

                  <button
                    onClick={onOpenDemoModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-sm font-bold shadow-lg shadow-amber-400/20 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Join Speed Booster Batch</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Trust Banner */}
          <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Standard MP CPCT 5-character word standard used for Net WPM calculations.
            </span>
            <span className="text-slate-600">
              📍 Computer Lab at <strong>Kalapatha Road, Betul</strong> | 7 AM - 8 PM
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
