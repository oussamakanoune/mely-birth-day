import { createContext } from 'react';
import type { Track } from '../data/tracks';

export interface AudioContextType {
  currentTrack: Track;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isShuffle: boolean;
  isLoop: boolean;
  audioError: string | null;
  playTrack: (track: Track) => Promise<boolean>;
  togglePlay: () => Promise<void>;
  seek: (time: number) => void;
  setVolume: (val: number) => void;
  toggleMute: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  toggleShuffle: () => void;
  toggleLoop: () => void;
  clearError: () => void;
  startInitialPlayback: () => Promise<boolean>;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);
