import { usePlayerStore } from "@/store/playerStore";
import { useEffect, useState } from "react";
import { Slider } from "./Slider";

export default function SongControl() {
  const audio = usePlayerStore((state) => state.audio);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    audio?.addEventListener("timeupdate", handleTimeUpdate);
    return () => {
      audio?.addEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  const handleTimeUpdate = () => {
    if (audio !== null) setCurrentTime(audio?.currentTime);
  };

  const formatTime = (time?: number) => {
    if (!time) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex gap-x-2">
      <span className="w-12 text-right opacity-70">{formatTime(currentTime)}</span>
      <Slider
        value={[currentTime]}
        max={audio?.duration ? audio?.duration : 0}
        min={0}
        className="w-[400px]"
        onValueChange={(value) => {
          const [currentTime] = value;
          if (audio !== null) audio.currentTime = currentTime;
        }}
      />
      <span className="w-12 opacity-70">{formatTime(audio?.duration)}</span>
    </div>
  );
}
