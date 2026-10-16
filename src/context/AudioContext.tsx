import React, { useState, useRef, useEffect, useCallback } from 'react';
import { BIRTHDAY_PLAYLIST } from '../data/tracks';
import type { Track } from '../data/tracks';
import { AudioContext } from './AudioContextDef';

// Helper to reliably resolve and encode audio URLs for static hosting and special characters
const getResolvedAudioUrl = (src: string): string => {
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  const cleanPath = src.replace(/^\//, '');
  const baseUrl = import.meta.env.BASE_URL || './';
  const fullPath = baseUrl.endsWith('/') ? `${baseUrl}${cleanPath}` : `${baseUrl}/${cleanPath}`;
  return encodeURI(fullPath);
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initially Uranus - PNL is loaded
  const [currentTrack, setCurrentTrack] = useState<Track>(BIRTHDAY_PLAYLIST[0]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(BIRTHDAY_PLAYLIST[0].durationSec);
  const [volume, setVolumeState] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isShuffle, setIsShuffle] = useState<boolean>(false);
  const [isLoop, setIsLoop] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isTransitioningRef = useRef<boolean>(false);
  const currentTrackRef = useRef<Track>(currentTrack);
  const loadedTrackIdRef = useRef<string | null>(null);
  const isLoopRef = useRef<boolean>(isLoop);
  const isShuffleRef = useRef<boolean>(isShuffle);

  useEffect(() => {
    currentTrackRef.current = currentTrack;
  }, [currentTrack]);

  useEffect(() => {
    isLoopRef.current = isLoop;
  }, [isLoop]);

  useEffect(() => {
    isShuffleRef.current = isShuffle;
  }, [isShuffle]);

  // Update volume
  const setVolume = useCallback((val: number) => {
    const clamped = Math.max(0, Math.min(1, val));
    setVolumeState(clamped);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : clamped;
    }
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.volume = next ? 0 : volume;
      }
      return next;
    });
  }, [volume]);

  const seek = useCallback((time: number) => {
    if (audioRef.current && isFinite(time)) {
      try {
        audioRef.current.currentTime = time;
        setCurrentTime(time);
      } catch (err) {
        console.warn('Seek error:', err);
      }
    }
  }, []);

  const clearError = useCallback(() => {
    setAudioError(null);
  }, []);

  // Play a specific track
  const playTrack = useCallback(async (track: Track): Promise<boolean> => {
    if (isTransitioningRef.current) return false;
    isTransitioningRef.current = true;
    setAudioError(null);

    // Strict rule for Ray'a — Amr Diab: clicking must not start audio!
    if (!track.isPlayable || !track.src) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setCurrentTrack(track);
      setIsPlaying(false);
      loadedTrackIdRef.current = track.id;
      isTransitioningRef.current = false;
      return false;
    }

    try {
      const audio = audioRef.current;
      if (!audio) {
        return false;
      }

      // Stop previous audio
      audio.pause();
      setCurrentTrack(track);
      setDuration(track.durationSec);
      setCurrentTime(0);

      // Resolve and encode audio file URL
      const resolvedSrc = getResolvedAudioUrl(track.src);
      audio.src = resolvedSrc;
      loadedTrackIdRef.current = track.id;
      audio.load();

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        await playPromise;
        setIsPlaying(true);
        return true;
      }
      return true;
    } catch (err) {
      console.warn('Playback could not start:', err);
      setIsPlaying(false);
      setAudioError(`Playback error for "${track.title}". Check audio format or permissions.`);
      return false;
    } finally {
      isTransitioningRef.current = false;
    }
  }, []);

  // Toggle play/pause on current track
  const togglePlay = useCallback(async () => {
    if (!currentTrack.isPlayable || !currentTrack.src) {
      // Ray'a or unplayable track: strictly never start audio!
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      // If audio already has this track loaded, resume directly
      if (loadedTrackIdRef.current === currentTrack.id && audio.src) {
        try {
          await audio.play();
          setIsPlaying(true);
          setAudioError(null);
        } catch (err) {
          console.warn('Play error:', err);
          setIsPlaying(false);
          setAudioError(`Could not play "${currentTrack.title}".`);
        }
      } else {
        // Load and play track
        await playTrack(currentTrack);
      }
    }
  }, [currentTrack, isPlaying, playTrack]);

  // Next track callback
  const nextTrack = useCallback(() => {
    const playableTracks = BIRTHDAY_PLAYLIST.filter(t => t.isPlayable);
    if (playableTracks.length === 0) return;

    if (isShuffleRef.current) {
      const currentIdx = playableTracks.findIndex(t => t.id === currentTrackRef.current.id);
      const remaining = playableTracks.filter((_, idx) => idx !== currentIdx);
      const next = remaining[Math.floor(Math.random() * remaining.length)] || playableTracks[0];
      playTrack(next);
      return;
    }

    const currentIndex = BIRTHDAY_PLAYLIST.findIndex(t => t.id === currentTrackRef.current.id);
    let nextIndex = (currentIndex + 1) % BIRTHDAY_PLAYLIST.length;

    // Advance to next playable track
    let count = 0;
    while (!BIRTHDAY_PLAYLIST[nextIndex].isPlayable && count < BIRTHDAY_PLAYLIST.length) {
      nextIndex = (nextIndex + 1) % BIRTHDAY_PLAYLIST.length;
      count++;
    }

    playTrack(BIRTHDAY_PLAYLIST[nextIndex]);
  }, [playTrack]);

  // Prev track callback
  const prevTrack = useCallback(() => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      seek(0);
      return;
    }

    const currentIndex = BIRTHDAY_PLAYLIST.findIndex(t => t.id === currentTrackRef.current.id);
    let prevIndex = (currentIndex - 1 + BIRTHDAY_PLAYLIST.length) % BIRTHDAY_PLAYLIST.length;

    // Retreat to previous playable track
    let count = 0;
    while (!BIRTHDAY_PLAYLIST[prevIndex].isPlayable && count < BIRTHDAY_PLAYLIST.length) {
      prevIndex = (prevIndex - 1 + BIRTHDAY_PLAYLIST.length) % BIRTHDAY_PLAYLIST.length;
      count++;
    }

    playTrack(BIRTHDAY_PLAYLIST[prevIndex]);
  }, [playTrack, seek]);

  const toggleShuffle = useCallback(() => {
    setIsShuffle(prev => !prev);
  }, []);

  const toggleLoop = useCallback(() => {
    setIsLoop(prev => !prev);
  }, []);

  // Initialize single audio element
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'metadata';
    audio.volume = 0.75;
    audioRef.current = audio;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onCanPlay = () => {
      if (audio.duration && !isNaN(audio.duration) && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    const onPlay = () => {
      setIsPlaying(true);
      setAudioError(null);
    };

    const onPause = () => {
      setIsPlaying(false);
    };

    const onError = () => {
      setIsPlaying(false);
      if (audio.src && audio.src !== window.location.href) {
        setAudioError(`Audio for "${currentTrackRef.current.title}" failed to load.`);
      }
    };

    const onEnded = () => {
      if (isLoopRef.current) {
        audio.currentTime = 0;
        audio.play().catch(console.warn);
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('canplay', onCanPlay);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', onEnded);

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('canplay', onCanPlay);
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
    };
  }, [nextTrack]);

  // Envelope click initiation
  const startInitialPlayback = useCallback(async (): Promise<boolean> => {
    const uranusTrack = BIRTHDAY_PLAYLIST[0];
    return playTrack(uranusTrack);
  }, [playTrack]);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isShuffle,
        isLoop,
        audioError,
        playTrack,
        togglePlay,
        seek,
        setVolume,
        toggleMute,
        nextTrack,
        prevTrack,
        toggleShuffle,
        toggleLoop,
        clearError,
        startInitialPlayback
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
