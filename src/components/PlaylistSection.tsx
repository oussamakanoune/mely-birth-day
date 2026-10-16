import React, { useRef } from 'react';
import { Music, Play, Pause, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { BIRTHDAY_PLAYLIST } from '../data/tracks';
import type { Track } from '../data/tracks';
import { SongArtwork } from './SongArtwork';
import { useAudio } from '../context/useAudio';

export const PlaylistSection: React.FC = () => {
  const { currentTrack, isPlaying, playTrack, togglePlay } = useAudio();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const handleCardClick = (track: Track) => {
    if (currentTrack.id === track.id) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  return (
    <section id="playlist" className="relative py-12 px-4 sm:px-8 max-w-7xl mx-auto z-10">
      {/* Outer Card Container (Matches Reference 3) */}
      <div className="relative p-6 sm:p-8 rounded-3xl glass-surface border border-pink-400/30 shadow-[0_15px_50px_rgba(0,0,0,0.45)]">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-pink-500/20 border border-pink-400/40 text-pink-300 shadow-[0_0_15px_rgba(244,114,182,0.3)]">
              <Music className="w-5 h-5 text-pink-400" />
            </div>
            <div>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-white tracking-wide">
                Your Birthday Playlist
              </h2>
              <p className="text-xs sm:text-sm text-pink-200/70 font-sans">
                A special selection to make your day even brighter.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* "Good Music Good Vibes" pill matching Reference 3 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-pill border border-pink-400/30 text-xs text-pink-200 font-medium">
              <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
              <span>Good Music · Good Vibes</span>
            </div>

            {/* Slider Navigation Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={scrollLeft}
                aria-label="Scroll playlist left"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-pink-500/20 text-slate-200 hover:text-white border border-pink-400/20 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={scrollRight}
                aria-label="Scroll playlist right"
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-pink-500/20 text-slate-200 hover:text-white border border-pink-400/20 transition-all cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal scrollable track carousel with responsive fallback */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth snap-x snap-mandatory"
        >
          {BIRTHDAY_PLAYLIST.map((track) => {
            const isCurrent = currentTrack.id === track.id;
            const isCurrentPlaying = isCurrent && isPlaying;

            return (
              <div
                key={track.id}
                role="button"
                tabIndex={0}
                aria-label={`Play ${track.title} by ${track.artist}`}
                onClick={() => handleCardClick(track)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(track);
                  }
                }}
                className={`flex-none w-44 sm:w-52 p-3 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer snap-start group relative text-center focus:outline-none focus:ring-2 focus:ring-pink-400 ${
                  isCurrent
                    ? 'glass-surface border-2 border-pink-500 shadow-[0_0_24px_rgba(236,72,153,0.4)] scale-[1.02]'
                    : 'glass-surface border border-pink-400/20 hover:border-pink-400/50 hover:bg-pink-950/20 hover:scale-[1.01]'
                }`}
              >
                {/* Artwork Area */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 shadow-md group-hover:shadow-pink-500/20 transition-shadow">
                  <SongArtwork track={track} />

                  {/* Equalizer overlay when playing */}
                  {isCurrentPlaying && (
                    <div className="absolute top-2 right-2 flex items-end gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-pink-400/30">
                      <span className="w-1 bg-pink-400 rounded-full animate-eq-1" />
                      <span className="w-1 bg-pink-300 rounded-full animate-eq-2" />
                      <span className="w-1 bg-pink-400 rounded-full animate-eq-3" />
                    </div>
                  )}

                  {/* Hover play overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full bg-pink-500/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      {isCurrentPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Track Title */}
                <h3 className="font-sans font-semibold text-sm sm:text-base text-white truncate group-hover:text-pink-200 transition-colors">
                  {track.title}
                </h3>

                {/* Artist Name */}
                <p className="font-sans text-xs sm:text-sm text-pink-300/80 truncate mt-0.5">
                  {track.artist}
                </p>

                {/* Play Button matching Reference 3 style (circular pink button) */}
                <div className="mt-3 flex justify-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-white transition-all duration-200 shadow-md ${
                      isCurrentPlaying
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 shadow-[0_0_12px_rgba(236,72,153,0.6)]'
                        : 'bg-pink-500/30 group-hover:bg-pink-500 text-pink-200 group-hover:text-white border border-pink-400/40'
                    }`}
                  >
                    {isCurrentPlaying ? (
                      <Pause className="w-4 h-4 fill-current" />
                    ) : (
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
