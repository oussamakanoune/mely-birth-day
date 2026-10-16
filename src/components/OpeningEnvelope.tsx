import React, { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart } from 'lucide-react';
import { useAudio } from '../context/useAudio';

interface OpeningEnvelopeProps {
  onOpened: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({ onOpened }) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const { startInitialPlayback } = useAudio();

  const handleOpen = useCallback(async () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);

    // 1. Immediately initiate background track Uranus - PNL from the user gesture
    try {
      startInitialPlayback().catch(err => {
        console.warn('Initial background music play was prevented or failed:', err);
      });
    } catch (e) {
      console.warn('Playback error caught:', e);
    }

    // 2. Trigger soft, elegant celebratory pastel sparkles
    const count = 40;
    const defaults = {
      origin: { y: 0.6 },
      colors: ['#fbcfe8', '#f472b6', '#e9d5ff', '#fed7aa', '#ffffff'],
      disableForReducedMotion: true
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio)
      });
    }

    setTimeout(() => {
      fire(0.35, { spread: 45, startVelocity: 25, scalar: 0.8 });
      fire(0.25, { spread: 60, scalar: 1.1 });
      fire(0.4, { spread: 80, decay: 0.92, scalar: 0.9 });
    }, 450);

    // 3. Complete opening transition
    setTimeout(() => {
      setIsOpened(true);
      setTimeout(() => {
        onOpened();
      }, 500);
    }, 1400);
  }, [isOpening, isOpened, onOpened, startInitialPlayback]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleOpen();
    }
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 transition-all duration-700 ${
        isOpened ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      style={{
        background: 'radial-gradient(ellipse at center, rgba(35, 20, 55, 0.94) 0%, rgba(14, 9, 28, 0.98) 100%)'
      }}
    >
      {/* Subtle hint text above */}
      <div className="mb-8 text-center animate-pulse">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm tracking-wider uppercase font-medium text-pink-200/90 bg-pink-950/40 border border-pink-500/20 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          A Little Birthday Surprise For You
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        </span>
      </div>

      {/* Interactive Envelope Container */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Open your birthday envelope"
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        className={`relative w-80 sm:w-96 h-52 sm:h-64 cursor-pointer focus:outline-none focus:ring-4 focus:ring-pink-400/50 rounded-2xl perspective-1000 transition-transform duration-300 ${
          isOpening ? 'scale-105' : 'hover:scale-[1.03] active:scale-[0.99]'
        }`}
      >
        {/* Shadow underneath */}
        <div className="absolute -bottom-6 left-6 right-6 h-8 bg-black/60 rounded-full blur-xl transform scale-y-50" />

        {/* Envelope Body (Pink Paper) */}
        <div className="relative w-full h-full rounded-xl overflow-hidden shadow-2xl bg-gradient-to-br from-[#f8bcc8] via-[#f3a4b6] to-[#e48b9f] border border-pink-200/40">
          {/* Paper Texture subtle overlay */}
          <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-noise" />

          {/* Envelope interior lining (deep rose lavender) */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#4a2139] to-[#2a1322]" />

          {/* Letter / Card emerging from inside */}
          <div
            className={`absolute left-4 right-4 h-48 bg-gradient-to-b from-white via-rose-50 to-pink-50 rounded-lg p-5 shadow-lg flex flex-col items-center justify-center text-center transition-all duration-700 ease-out border border-pink-200 ${
              isOpening ? '-translate-y-28 opacity-100 z-10' : 'translate-y-6 opacity-0 z-0'
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center mb-2">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-400" />
            </div>
            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-gray-800 tracking-wide">
              Happy Birthday!
            </h3>
            <p className="font-sans text-xs sm:text-sm text-pink-700/80 mt-1">
              Opening your celebration...
            </p>
          </div>

          {/* Envelope Pocket: Left Triangle Fold */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              clipPath: 'polygon(0 0, 0 100%, 50% 55%)',
              background: 'linear-gradient(135deg, #f5abbb 0%, #ea95a8 100%)',
              filter: 'drop-shadow(2px 0 3px rgba(0,0,0,0.12))'
            }}
          />

          {/* Envelope Pocket: Right Triangle Fold */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              clipPath: 'polygon(100% 0, 100% 100%, 50% 55%)',
              background: 'linear-gradient(225deg, #f5abbb 0%, #ea95a8 100%)',
              filter: 'drop-shadow(-2px 0 3px rgba(0,0,0,0.12))'
            }}
          />

          {/* Envelope Pocket: Bottom Triangle Fold */}
          <div
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              clipPath: 'polygon(0 100%, 100% 100%, 50% 48%)',
              background: 'linear-gradient(0deg, #df8497 0%, #f4a6b7 100%)',
              boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3)'
            }}
          />

          {/* Envelope Top Flap (3D opening fold) */}
          <div
            className="absolute top-0 left-0 right-0 h-1/2 z-30 transition-transform duration-700 preserve-3d"
            style={{
              transformOrigin: 'top center',
              transform: isOpening ? 'rotateX(180deg)' : 'rotateX(0deg)',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              background: 'linear-gradient(180deg, #f8bac6 0%, #f19fae 100%)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
            }}
          >
            {/* Flap subtle inner crease */}
            <div className="absolute inset-0 bg-white/10" />
          </div>

          {/* Floral Sprig & Red Wax Seal in Center */}
          <div
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex items-center justify-center transition-all duration-500 ${
              isOpening ? 'scale-125 opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {/* Delicate floral sprig behind the wax seal (Reference 1) */}
            <div className="absolute -top-6 -right-6 w-14 h-14 pointer-events-none transform rotate-12">
              <svg viewBox="0 0 60 60" fill="none" className="w-full h-full">
                {/* Thin green stem */}
                <path d="M10 50 Q 25 35 45 15" stroke="#3d4c38" strokeWidth="1.5" />
                <path d="M25 35 Q 35 25 40 20" stroke="#3d4c38" strokeWidth="1" />
                {/* Tiny baby's breath blossoms */}
                <circle cx="45" cy="15" r="3" fill="#ffffff" stroke="#fbcfe8" strokeWidth="0.5" />
                <circle cx="48" cy="20" r="2.5" fill="#fff5f5" />
                <circle cx="38" cy="22" r="2.5" fill="#ffffff" />
                <circle cx="32" cy="28" r="2" fill="#fff5f5" />
                <circle cx="42" cy="12" r="2" fill="#ffffff" />
              </svg>
            </div>

            {/* Deep-red wax seal button */}
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center shadow-[0_6px_16px_rgba(120,20,30,0.6)] cursor-pointer group">
              {/* Wax irregular edges */}
              <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-[#b81d2d] via-[#8c1421] to-[#590b14] border border-red-400/40"
                style={{
                  boxShadow: 'inset 0 2px 4px rgba(255,200,200,0.4), inset 0 -3px 6px rgba(0,0,0,0.6)'
                }}
              />

              {/* Inner ring & tree/floral embossed stamp */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-red-950/60 flex items-center justify-center bg-gradient-to-br from-[#9b1624] to-[#6e0f19] shadow-inner">
                <svg
                  viewBox="0 0 36 36"
                  className="w-7 h-7 text-red-200/80 drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]"
                  fill="currentColor"
                >
                  {/* Tree of Life motif matching Reference 1 seal */}
                  <path d="M18 6 C17 6 15 9 15 11 C13 10 11 11 11 13 C9 13 8 15 9 17 C7 18 8 20 9 21 C10 22 12 22 13 21 C14 23 16 23 17 22 L17 28 L14 30 L14 31 L22 31 L22 30 L19 28 L19 22 C20 23 22 23 23 21 C24 22 26 22 27 21 C28 20 29 18 27 17 C28 15 27 13 25 13 C25 11 23 10 21 11 C21 9 19 6 18 6 Z" />
                </svg>
              </div>

              {/* Gentle pulse hint */}
              <div className="absolute inset-0 rounded-full border-2 border-pink-300/40 animate-ping opacity-30" />
            </div>
          </div>
        </div>
      </div>

      {/* Click prompt below */}
      <div className="mt-8 text-center">
        <p className="text-pink-200/70 text-sm tracking-wide font-sans flex items-center gap-2 justify-center">
          <span>Click the envelope or wax seal to open</span>
          <span className="text-pink-400">✨</span>
        </p>
      </div>
    </div>
  );
};
