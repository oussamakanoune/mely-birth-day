import React, { useState } from 'react';
import { Music2, Play, Pause, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useAudio } from '../context/useAudio';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavigate }) => {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    volume,
    setVolume,
    isMuted,
    toggleMute
  } = useAudio();

  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'playlist', label: 'Music' },
    { id: 'message', label: 'Message' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 sm:py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Minimal site brand / celebration badge */}
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400">
            <Sparkles className="w-4 h-4" />
          </span>
          <span className="hidden sm:inline font-serif-display text-sm font-semibold tracking-wider text-pink-100/90 uppercase">
            Birthday Special
          </span>
        </div>

        {/* Center: Elegant navigation pill */}
        <nav className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 rounded-full glass-pill border border-pink-500/20 shadow-lg" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`relative px-3 sm:px-4 py-1 text-xs sm:text-sm font-medium rounded-full transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-pink-100 bg-pink-500/25 border border-pink-400/40 shadow-[0_0_12px_rgba(244,114,182,0.3)]'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Background Music Control (matches Reference 3) */}
        <div className="relative flex items-center shrink-0">
          <div
            className="flex items-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full glass-surface border border-pink-400/30 shadow-[0_4px_20px_rgba(0,0,0,0.35)] transition-all hover:border-pink-400/60"
            role="region"
            aria-label="Background Music Controller"
          >
            {/* Music Icon with equalizer/pulse when playing */}
            <div className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-pink-500/20 text-pink-300 border border-pink-400/30 shrink-0">
              <Music2 className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isPlaying ? 'animate-bounce text-pink-400' : ''}`} />
            </div>

            {/* Track Info */}
            <div className="text-left hidden md:block max-w-[110px] lg:max-w-[140px] truncate">
              <p className="text-xs font-semibold text-white truncate leading-tight">
                {currentTrack.title}
              </p>
              <p className="text-[10px] text-pink-300/80 truncate leading-tight">
                {currentTrack.artist}
              </p>
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={() => togglePlay()}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-pink-500/30 hover:bg-pink-500/50 text-white transition-all duration-200 border border-pink-400/40 hover:scale-105 active:scale-95 cursor-pointer shadow-[0_0_10px_rgba(236,72,153,0.3)]"
            >
              {isPlaying ? (
                <Pause className="w-3.5 h-3.5 fill-current" />
              ) : (
                <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              )}
            </button>

            {/* Volume toggle button */}
            <div className="relative">
              <button
                onClick={() => setShowVolumeSlider(prev => !prev)}
                aria-label={isMuted ? 'Unmute' : 'Adjust volume'}
                className="flex items-center justify-center w-6 h-6 sm:w-7 sm:h-7 rounded-full text-pink-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX className="w-3.5 h-3.5 text-pink-400" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Volume Slider Popover */}
              {showVolumeSlider && (
                <div
                  className="absolute right-0 top-full mt-2 p-3 rounded-xl glass-surface border border-pink-400/30 shadow-2xl flex flex-col items-center gap-2 z-50 min-w-[130px] animate-in fade-in zoom-in-95 duration-150"
                  onMouseLeave={() => setShowVolumeSlider(false)}
                >
                  <div className="flex items-center justify-between w-full text-[11px] text-pink-200/80">
                    <span>Volume</span>
                    <span>{isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      if (isMuted) toggleMute();
                      setVolume(parseFloat(e.target.value));
                    }}
                    aria-label="Volume slider"
                    className="w-full accent-pink-500 cursor-pointer h-1.5 bg-pink-950/60 rounded-lg"
                  />
                  <button
                    onClick={toggleMute}
                    className="text-[10px] text-pink-300 hover:text-white underline cursor-pointer"
                  >
                    {isMuted ? 'Unmute' : 'Mute'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
