import { Pause } from "@/icons/react/Pause";
import { Play } from "@/icons/react/Play";
import type { Song } from "@/lib/data";
import { cn } from "@/lib/utils/cn";
import { usePlayerStore } from "@/store/playerStore";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

interface PlayButtonProps {
  id?: string;
  className?: string;
  iconClassName?: string;
  songId?: number;
}

export default function PlayButton({ id, className, iconClassName, songId }: PlayButtonProps) {
  const { isPlaying, setIsPlaying, currentMusic, setCurrentMusic } = usePlayerStore((state) => state);
  const [isPlayingPlaylist, setIsPlayingList] = useState<boolean>(false);

  const getCurrentSong = (songs: Song[]) => {
    let currentSong;
    if (!songId) {
      currentSong = currentMusic.playlist?.id === id ? currentMusic.song : songs[0];
    } else {
      currentSong = songs.find((s) => s.id === songId) ?? songs[0];
    }
    return currentSong;
  };

  const handleClick = () => {
    if (!id) return;
    if (isPlayingPlaylist) {
      setIsPlaying(false);
      return;
    }
    fetch(`/api/get-info-playlist.json?id=${id}`)
      .then((res) => res.json())
      .then((data) => {
        const { songs, playlist } = data;
        const currentSong = getCurrentSong(songs as Song[]);
        setIsPlaying(true);
        setCurrentMusic({
          songs,
          playlist,
          song: currentSong
        });
      });
  };

  useEffect(() => {
    const isSongInPlaylist = Boolean(songId) ? currentMusic.song?.id === songId : true;
    const isPlayingPlaylist = isPlaying && currentMusic.playlist?.id === id && isSongInPlaylist;
    setIsPlayingList(isPlayingPlaylist);
  }, [isPlaying, currentMusic.playlist?.id, songId]);

  return (
    <Button
      isIconOnly
      className={cn("flex items-center justify-center rounded-full bg-green-500 hover:scale-110", className)}
      fullWidth={false}
      onClick={handleClick}
    >
      {isPlayingPlaylist ? <Pause className={iconClassName} /> : <Play className={iconClassName} />}
    </Button>
  );
}
