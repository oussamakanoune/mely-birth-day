import React, { useState, useEffect } from 'react';
import { AudioProvider } from './context/AudioContext';
import { AtmosphereCanvas } from './components/AtmosphereCanvas';
import { ScenicBackground } from './components/ScenicBackground';
import { OpeningEnvelope } from './components/OpeningEnvelope';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PlaylistSection } from './components/PlaylistSection';
import { BottomPlayer } from './components/BottomPlayer';
import { Footer } from './components/Footer';

const BirthdayApp: React.FC = () => {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'playlist', 'message'];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen text-slate-100 overflow-x-hidden">
      {/* Dynamic Starlight & Drifting Petals Canvas */}
      <AtmosphereCanvas />

      {/* Dreamy Night Lake Balcony Scenic Background */}
      <ScenicBackground />

      {/* Initial 3D Opening Envelope Screen */}
      {!isEnvelopeOpened && (
        <OpeningEnvelope onOpened={() => setIsEnvelopeOpened(true)} />
      )}

      {/* Main Interactive Birthday Experience */}
      <div className={`relative z-10 flex flex-col min-h-screen transition-opacity duration-1000 ${
        isEnvelopeOpened ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Top Navbar with Navigation and Top-Right Background Music Control */}
        <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

        {/* Hero Section with Headings & Approved Birthday Message */}
        <main className="flex-1 pb-8 sm:pb-12">
          <HeroSection onExplorePlaylist={() => handleNavigate('playlist')} />

          {/* 8-Track Birthday Playlist */}
          <PlaylistSection />
        </main>

        {/* Approved Footer */}
        <Footer />

        {/* Full Synchronized Bottom Music Player */}
        <BottomPlayer />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AudioProvider>
      <BirthdayApp />
    </AudioProvider>
  );
}
