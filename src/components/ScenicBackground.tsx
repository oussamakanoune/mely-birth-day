import React from 'react';

export const ScenicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">
      {/* Deep night sky base gradient */}
      <div className="absolute inset-0 bg-radial from-[#1e1035] via-[#100a22] to-[#070512]" />

      {/* Atmospheric nebula / purple glow */}
      <div className="absolute -top-32 left-1/4 w-[700px] h-[700px] rounded-full bg-fuchsia-900/15 blur-[140px]" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-violet-800/15 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 w-[800px] h-[400px] rounded-full bg-pink-900/10 blur-[150px]" />

      {/* Crescent Moon in top right (matching Reference 1 & 3) */}
      <div className="absolute top-6 sm:top-10 right-8 sm:right-24 w-16 h-16 sm:w-20 sm:h-20 opacity-90 animate-float">
        {/* Soft lunar glow */}
        <div className="absolute inset-0 rounded-full bg-amber-100/20 blur-xl scale-150" />
        <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(254,243,199,0.7)]">
          <defs>
            <linearGradient id="moonGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fffbeb" />
              <stop offset="60%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
            <filter id="moonBlur">
              <feGaussianBlur stdDeviation="0.8" />
            </filter>
          </defs>
          <path
            d="M 68 15 A 40 40 0 1 0 85 75 A 36 36 0 1 1 68 15 Z"
            fill="url(#moonGlow)"
            filter="url(#moonBlur)"
          />
        </svg>
      </div>

      {/* Distant mountains silhouette */}
      <div className="absolute bottom-28 sm:bottom-36 left-0 right-0 h-48 opacity-35">
        <svg viewBox="0 0 1440 260" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M0,190 L180,120 L340,160 L540,80 L760,150 L980,95 L1180,140 L1340,105 L1440,150 L1440,260 L0,260 Z"
            fill="#150d2b"
          />
          <path
            d="M0,210 L220,160 L450,190 L680,140 L890,175 L1120,130 L1320,180 L1440,165 L1440,260 L0,260 Z"
            fill="#0f0920"
          />
        </svg>
      </div>

      {/* Distant city / shoreline warm bokeh lights */}
      <div className="absolute bottom-32 sm:bottom-40 left-0 right-0 flex justify-around opacity-60">
        {[...Array(24)].map((_, i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-amber-300/80 shadow-[0_0_8px_rgba(252,211,77,0.9)]"
            style={{
              transform: `translateY(${Math.sin(i * 1.5) * 14}px)`,
              opacity: 0.3 + (i % 5) * 0.15,
            }}
          />
        ))}
      </div>

      {/* Water reflection shimmer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0c081b] via-[#120a26]/90 to-transparent" />

      {/* Elegant hanging floral vine on top-left edge (matching References) */}
      <div className="absolute -top-6 -left-6 sm:top-0 sm:left-0 w-44 sm:w-64 opacity-75">
        <svg viewBox="0 0 200 220" fill="none" className="w-full h-full">
          {/* Stem */}
          <path d="M-10,-10 C40,40 30,120 70,160 C90,180 120,200 130,220" stroke="#4a243b" strokeWidth="3" fill="none" />
          <path d="M30,30 C60,50 80,90 100,120" stroke="#3d1e32" strokeWidth="2" fill="none" />
          
          {/* Leaves */}
          <path d="M40,60 C55,50 65,65 50,75 C35,85 25,70 40,60 Z" fill="#2d3748" opacity="0.8" />
          <path d="M65,110 C80,100 90,115 75,125 C60,135 50,120 65,110 Z" fill="#2d3748" opacity="0.8" />
          
          {/* Blossoms */}
          {[
            { cx: 35, cy: 45, r: 12 },
            { cx: 65, cy: 90, r: 14 },
            { cx: 45, cy: 130, r: 11 },
            { cx: 95, cy: 140, r: 13 },
            { cx: 125, cy: 195, r: 10 },
            { cx: 80, cy: 50, r: 9 }
          ].map((flower, idx) => (
            <g key={idx} transform={`translate(${flower.cx}, ${flower.cy})`}>
              <circle cx="0" cy="0" r={flower.r} fill="#f472b6" opacity="0.6" filter="blur(2px)" />
              <circle cx="-4" cy="-3" r={flower.r * 0.7} fill="#fbcfe8" opacity="0.85" />
              <circle cx="4" cy="-3" r={flower.r * 0.7} fill="#f472b6" opacity="0.85" />
              <circle cx="5" cy="4" r={flower.r * 0.7} fill="#f9a8d4" opacity="0.85" />
              <circle cx="-5" cy="4" r={flower.r * 0.7} fill="#ec4899" opacity="0.85" />
              <circle cx="0" cy="0" r={flower.r * 0.35} fill="#fef08a" />
            </g>
          ))}
        </svg>
      </div>

      {/* Soft warm glowing lantern on left terrace */}
      <div className="hidden lg:block absolute bottom-24 left-10 w-24 h-48 pointer-events-none">
        <div className="absolute inset-0 bg-amber-500/15 rounded-full blur-2xl glow-ambient-lantern" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3 h-7 bg-amber-300 rounded-full blur-[1px] animate-flicker shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
      </div>

      {/* Soft warm glowing lantern on right terrace */}
      <div className="hidden lg:block absolute bottom-28 right-12 w-24 h-48 pointer-events-none">
        <div className="absolute inset-0 bg-amber-500/15 rounded-full blur-2xl glow-ambient-lantern" />
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-3 h-7 bg-amber-300 rounded-full blur-[1px] animate-flicker shadow-[0_0_15px_rgba(251,191,36,0.9)]" />
      </div>
    </div>
  );
};
