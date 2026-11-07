import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TypingTestSimulator from './components/TypingTestSimulator';
import CoursesSection from './components/CoursesSection';
import CpctGuideSection from './components/CpctGuideSection';
import LabFeatures from './components/LabFeatures';
import ResultsWall from './components/ResultsWall';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdmissionModal from './components/AdmissionModal';

function AppContent() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenDemoModal = () => setIsDemoModalOpen(true);
  const handleCloseDemoModal = () => setIsDemoModalOpen(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Navigation Header */}
      <Navbar 
        onOpenDemoModal={handleOpenDemoModal} 
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* Hero Section with Quick Course Advisor */}
        <Hero 
          onOpenDemoModal={handleOpenDemoModal} 
        />

        {/* Live Interactive Typing Speed Test Simulator */}
        <TypingTestSimulator 
          onOpenDemoModal={handleOpenDemoModal} 
        />

        {/* Career & Diploma Courses Catalog with Syllabus Modals */}
        <CoursesSection 
          onOpenDemoModal={handleOpenDemoModal} 
        />

        {/* Complete MP CPCT Examination Blueprint & Guide */}
        <CpctGuideSection 
          onOpenDemoModal={handleOpenDemoModal} 
        />

        {/* Infrastructure & Computer Lab Facility Tour */}
        <LabFeatures 
          onOpenDemoModal={handleOpenDemoModal} 
        />

        {/* Wall of Fame & Real Betul Student Results */}
        <ResultsWall />

        {/* Frequently Asked Questions */}
        <FaqSection 
          onOpenDemoModal={handleOpenDemoModal} 
        />

        {/* Location, Google Map & Contact Details */}
        <ContactSection />
      </main>

      {/* Footer & Mobile Navigation Actions */}
      <Footer 
        onOpenDemoModal={handleOpenDemoModal} 
      />

      {/* 2-Day Free Trial / Demo Class Booking Modal */}
      <AdmissionModal 
        isOpen={isDemoModalOpen} 
        onClose={handleCloseDemoModal} 
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
