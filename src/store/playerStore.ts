import type { Playlist, Song } from "@/lib/data";
import { create } from "zustand";

type Music = {
  playlist?: Partial<Playlist> | null;
  song?: Song | null;
  songs?: Array<Song>;
};

interface PlayerStore {
  audio: HTMLAudioElement | null;
  setAudio: (audio: HTMLAudioElement | null) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
  currentMusic: Music;
  setCurrentMusic: (currentMusic: Music) => void;
  volume: number;
  setVolume: (volume: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  audio: typeof Audio !== "undefined" ? new Audio() : null,
  setAudio: (audio) => set({ audio }),
  isPlaying: false,
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  currentMusic: {
    playlist: null,
    song: null,
    songs: []
  },
  setCurrentMusic: (currentMusic) => set({ currentMusic }),
  volume: 1,
  setVolume: (volume) => set({ volume })
}));
