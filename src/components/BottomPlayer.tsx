import React, { useState } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  Heart,
  AlertCircle,
  X
} from 'lucide-react';
import { useAudio } from '../context/useAudio';
import { SongArtwork } from './SongArtwork';

export const BottomPlayer: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    setVolume,
    isMuted,
    toggleMute,
    seek,
    togglePlay,
    nextTrack,
    prevTrack,
    isShuffle,
    toggleShuffle,
    isLoop,
    toggleLoop,
    audioError,
    clearError
  } = useAudio();

  const [isLiked, setIsLiked] = useState<boolean>(false);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainingSecs = Math.floor(secs % 60);
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    seek(newTime);
  };

  return (
    <>
      {/* Toast notification if audio source is unavailable */}
      {audioError && (
        <div className="fixed bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 z-50 max-w-md w-[92%] px-4 py-3 rounded-2xl glass-surface border border-pink-400/40 shadow-2xl flex items-center justify-between gap-3 text-xs sm:text-sm text-pink-200 animate-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-pink-400 shrink-0" />
            <span>{audioError}</span>
          </div>
          <button
            onClick={clearError}
            className="p-1 rounded-full hover:bg-white/10 text-pink-300 hover:text-white cursor-pointer"
            aria-label="Dismiss error"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Bottom Music Bar (Reference 3) */}
      <div className="fixed bottom-0 left-0 right-0 z-40 px-2.5 sm:px-6 pb-2.5 sm:pb-3 pt-1 pointer-events-none">
        <div className="max-w-4xl lg:max-w-5xl mx-auto rounded-2xl sm:rounded-3xl glass-surface border border-pink-400/30 px-3 py-2 sm:px-5 sm:py-2.5 shadow-[0_-5px_25px_rgba(0,0,0,0.5)] pointer-events-auto backdrop-blur-xl">
          <div className="flex flex-col gap-1.5 sm:gap-2">
            {/* Top row: Track Info, Controls, Volume */}
            <div className="flex items-center justify-between gap-2 sm:gap-4">
              {/* Left: Artwork, Title, Artist, Like */}
              <div className="flex items-center gap-2 sm:gap-3 min-w-0 max-w-[44%] sm:max-w-[32%]">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden shrink-0 border border-pink-400/30 shadow">
                  <SongArtwork track={currentTrack} />
                </div>
                <div className="min-w-0 truncate">
                  <h4 className="text-xs sm:text-sm font-semibold text-white truncate leading-tight">
                    {currentTrack.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-pink-300/80 truncate leading-tight">
                    {currentTrack.artist}
                  </p>
                </div>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  aria-label={isLiked ? 'Unlike song' : 'Like song'}
                  className="hidden lg:flex items-center justify-center text-pink-400 hover:text-pink-300 transition-colors p-1 shrink-0 cursor-pointer"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-pink-500 text-pink-500' : 'opacity-60 hover:opacity-100'}`} />
                </button>
              </div>

              {/* Center: Playback Controls */}
              <div className="flex items-center gap-1 sm:gap-3 shrink-0">
                <button
                  onClick={toggleShuffle}
                  aria-label="Toggle shuffle"
                  className={`hidden sm:flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-colors cursor-pointer ${
                    isShuffle ? 'text-pink-400 bg-pink-500/20' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Shuffle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  onClick={prevTrack}
                  aria-label="Previous track"
                  className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <SkipBack className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                </button>

                {/* Big Center Play/Pause Button */}
                <button
                  onClick={() => togglePlay()}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-[0_0_15px_rgba(236,72,153,0.5)] hover:shadow-[0_0_22px_rgba(236,72,153,0.8)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
                  ) : (
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={nextTrack}
                  aria-label="Next track"
                  className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <SkipForward className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
                </button>

                <button
                  onClick={toggleLoop}
                  aria-label="Toggle loop"
                  className={`hidden sm:flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-colors cursor-pointer ${
                    isLoop ? 'text-pink-400 bg-pink-500/20' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Repeat className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>

              {/* Right: Volume & Status */}
              <div className="flex items-center gap-1.5 sm:gap-2 justify-end min-w-0 max-w-[28%]">
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="text-slate-300 hover:text-white transition-colors p-1 cursor-pointer"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-pink-400" />
                  ) : (
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  )}
                </button>
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
                  className="hidden md:block w-16 lg:w-24 accent-pink-500 cursor-pointer h-1.5 bg-pink-950/50 rounded-lg"
                />
              </div>
            </div>

            {/* Bottom row: Timeline Progress Slider with timestamps */}
            <div className="flex items-center gap-2 px-1">
              <span className="text-[10px] text-pink-200/70 w-7 sm:w-9 text-right font-mono">
                {formatTime(currentTime)}
              </span>
              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeekChange}
                  aria-label="Playback progress slider"
                  className="w-full accent-pink-400 cursor-pointer h-1 sm:h-1.5 bg-pink-950/60 rounded-full"
                />
                {/* Visual fill indicator */}
                <div
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 sm:h-1.5 bg-gradient-to-r from-pink-500 to-rose-400 rounded-full pointer-events-none shadow-[0_0_6px_rgba(244,114,182,0.8)]"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <span className="text-[10px] text-pink-200/70 w-7 sm:w-9 font-mono">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
