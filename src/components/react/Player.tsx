import { usePlayerStore } from "@/store/playerStore";
import { useEffect } from "react";
import CurrentSong from "./CurrentSong";
import PlayerController from "./PlayerController";
import VolumeControl from "./VolumeControl";

export function Player() {
  const { isPlaying, currentMusic, volume, audio } = usePlayerStore((state) => state);

  useEffect(() => {
    isPlaying && audio !== null ? audio?.play() : audio?.pause();
  }, [isPlaying]);

  useEffect(() => {
    if (audio !== null) audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const { song, playlist } = currentMusic;
    if (song && audio !== null) {
      const src = `/music/${playlist?.id}/0${song.id}.mp3`;
      audio.src = src;
      audio.volume = volume;
      audio.play();
    }
  }, [currentMusic]);

  return (
    <div className="z-50 flex h-full w-full flex-row justify-between bg-black px-1">
      <div className="w-[250px]">
        <CurrentSong {...currentMusic.song} />
      </div>
      <div className="grid flex-1 place-content-center gap-4">
        <PlayerController />
      </div>
      <div className="grid place-content-center">
        <VolumeControl />
      </div>
    </div>
  );
}
