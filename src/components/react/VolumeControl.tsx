import { VolumeHigh } from "@/icons/react/VolumeHigh";
import { VolumeLow } from "@/icons/react/VolumeLow";
import { VolumeMedium } from "@/icons/react/VolumeMedium";
import { VolumeSilence } from "@/icons/react/VolumeSilence";
import { usePlayerStore } from "@/store/playerStore";
import { useCallback, useEffect, useRef, useState, type ReactElement } from "react";
import { Slider } from "./Slider";

type VolumeLevel = "silence" | "low" | "medium" | "high";

const VOLUME_ICONS: Record<VolumeLevel, ReactElement> = {
  silence: <VolumeSilence />,
  low: <VolumeLow />,
  medium: <VolumeMedium />,
  high: <VolumeHigh />
};

export default function VolumeControl() {
  const volume = usePlayerStore((state) => state.volume);
  const setVolume = usePlayerStore((state) => state.setVolume);
  const previousVolumeRef = useRef(volume);
  const [currentVolumeIcon, setCurrentVolumeIcon] = useState<ReactElement | null>(null);

  const handleChangeVolume = (value: number[]) => {
    const [volumeValue] = value;
    const currentVolume = volumeValue / 100;
    setVolume(currentVolume);
  };

  const handleClickVolume = () => {
    if (volume === 0) {
      setVolume(previousVolumeRef.current);
    } else {
      previousVolumeRef.current = volume;
      setVolume(0);
    }
  };

  const calculateVolumeIcon = useCallback((volume: number) => {
    if (volume === 0) return VOLUME_ICONS["silence"];
    const currentVolume = volume * 100;
    if (currentVolume < 33.33) {
      return VOLUME_ICONS["low"];
    } else if (currentVolume < 66.66) {
      return VOLUME_ICONS["medium"];
    } else {
      return VOLUME_ICONS["high"];
    }
  }, []);

  useEffect(() => {
    setCurrentVolumeIcon(calculateVolumeIcon(volume));
  }, [volume]);

  return (
    <div className="group flex justify-center gap-x-2">
      <button
        className="text-white opacity-70 transition-opacity group-hover:opacity-100"
        onClick={handleClickVolume}
      >
        {currentVolumeIcon}
      </button>
      <Slider
        defaultValue={[100]}
        max={100}
        min={0}
        value={[volume * 100]}
        className="w-[95px]"
        onValueChange={handleChangeVolume}
      />
    </div>
  );
}
