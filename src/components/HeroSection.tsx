import React from 'react';
import { Heart, Sparkles, GraduationCap, Compass, Stars } from 'lucide-react';

interface HeroSectionProps {
  onExplorePlaylist: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExplorePlaylist }) => {
  return (
    <section id="hero" className="relative pt-6 sm:pt-12 pb-16 px-4 sm:px-6 max-w-5xl mx-auto text-center z-10">
      {/* Decorative Top Sparkle Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-pill border border-pink-400/30 text-pink-200/90 text-xs sm:text-sm mb-6 animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
        <span>A Little Birthday Surprise Just for You</span>
        <Sparkles className="w-3.5 h-3.5 text-pink-400" />
      </div>

      {/* Main Heading: "Happy Birthday" matching Reference 2 & 3 */}
      <div className="relative mb-6">
        <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl font-bold tracking-wider text-white neon-glow-white">
          Happy
        </h1>
        <div className="-mt-3 sm:-mt-6">
          <span className="font-script-neon text-6xl sm:text-8xl md:text-9xl text-pink-400 neon-glow-pink inline-block transform -rotate-3 select-none">
            Birthday
          </span>
        </div>
      </div>

      {/* Glowing heart divider (matching References) */}
      <div className="flex items-center justify-center gap-4 my-6 opacity-90">
        <div className="w-16 sm:w-28 h-px bg-gradient-to-r from-transparent via-pink-400/80 to-pink-300" />
        <Heart className="w-4 h-4 text-pink-400 fill-pink-400/80 animate-pulse drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]" />
        <div className="w-16 sm:w-28 h-px bg-gradient-to-l from-transparent via-pink-400/80 to-pink-300" />
      </div>

      {/* Secondary Phrase */}
      <p className="font-serif-display text-base sm:text-xl text-pink-200/90 font-medium tracking-wide max-w-2xl mx-auto mb-10">
        "A New Age, A Thousand New Possibilities."
      </p>

      {/* Approved Birthday Message Card */}
      <div id="message" className="relative max-w-3xl mx-auto my-10 p-6 sm:p-10 rounded-3xl glass-surface border border-pink-400/30 shadow-[0_10px_40px_rgba(0,0,0,0.4)] text-left relative overflow-hidden group">
        {/* Subtle decorative inner corner lights */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-400/30 flex items-center justify-center text-pink-300 shadow-[0_0_12px_rgba(244,114,182,0.3)]">
              <Stars className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-white tracking-wide">
                A New Year, New Achievements!
              </h2>
              <p className="text-xs text-pink-300/80 font-medium">
                Celebration & Best Wishes
              </p>
            </div>
          </div>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed sm:leading-loose font-sans border-l-2 border-pink-500/40 pl-4 py-1 my-4">
            Happy Birthday! 🎉 I wish you a day filled with happiness, laughter, and beautiful moments. May the year ahead bring you success in your studies, wonderful opportunities, and amazing surprises. May all your hard work pay off, and may your dreams come true! ✨
          </p>

          <div className="mt-6 pt-5 border-t border-pink-500/20 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-pink-200/80">
              <GraduationCap className="w-4 h-4 text-pink-400" />
              <span>University Success & Bright Future</span>
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm text-pink-200/80">
              <Compass className="w-4 h-4 text-pink-400" />
              <span>Boundless Opportunities Ahead</span>
            </div>
          </div>
        </div>
      </div>

      {/* Button to Playlist (matches Reference 2 "Start the Surprise" / explore button style) */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onExplorePlaylist}
          className="group relative inline-flex items-center gap-3 px-8 py-3.5 rounded-full font-medium text-sm sm:text-base text-white bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 hover:from-pink-400 hover:to-rose-500 transition-all duration-300 shadow-[0_0_25px_rgba(236,72,153,0.45)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7)] hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span>Explore Your Birthday Playlist</span>
          <span className="transform group-hover:translate-y-0.5 transition-transform">↓</span>
        </button>
      </div>
    </section>
  );
};
