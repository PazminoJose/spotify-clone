import { Pause } from "@/icons/react/Pause";
import { Play } from "@/icons/react/Play";
import { usePlayerStore } from "@/store/playerStore";
import { Button } from "@nextui-org/button";
import SongControl from "./SongControl";

export default function PlayerController() {
  const { isPlaying, setIsPlaying } = usePlayerStore((state) => state);

  const handleClick = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Button isIconOnly className="rounded-full bg-white" onClick={handleClick}>
        {isPlaying ? <Pause className="" /> : <Play className="" />}
      </Button>
      <SongControl />
    </div>
  );
}
