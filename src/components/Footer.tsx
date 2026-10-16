import React from 'react';
import { Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-pink-500/20 pt-10 pb-36 sm:pb-40 md:pb-44 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        {/* Approved Footer Message */}
        <p className="font-serif-display text-xl sm:text-2xl font-bold text-pink-200 tracking-wide">
          "Cheers to Another Year of Success!"
        </p>

        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-pink-300/70 font-sans">
          <span>Crafted with admiration & respect for your university journey</span>
          <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 inline" />
        </div>

        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 font-mono tracking-wider uppercase">
            <Sparkles className="w-3 h-3 text-pink-400" />
            A Special Digital Birthday Experience
          </span>
        </div>
      </div>
    </footer>
  );
};
