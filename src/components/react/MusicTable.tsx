import { Time } from "@/icons/react/Time";
import type { Song } from "@/lib/data";
import { cn } from "@/lib/utils/cn";
import { formatArtists } from "@/lib/utils/formatArtists";
import { usePlayerStore } from "@/store/playerStore";
import { useShallow } from "zustand/react/shallow";
import PlayButton from "./PlayButton";

interface MusicTableProps {
  songs: Song[];
  playListId: string;
}

export default function MusicTable({ songs, playListId }: MusicTableProps) {
  const { isPlaying, currentMusic } = usePlayerStore(
    useShallow((state) => ({
      currentMusic: state.currentMusic,
      isPlaying: state.isPlaying
    }))
  );

  return (
    <table className="min-w-full table-auto divide-y divide-gray-500/50 text-left">
      <thead>
        <tr className="text-base text-zinc-400">
          <th className="px-4 py-2 font-semibold">#</th>
          <th className="px-4 py-2 font-semibold">Titulo</th>
          <th className="px-4 py-2 font-semibold">Album</th>
          <th className="px-4 py-2 font-semibold">
            <Time />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="h-[16px]"></tr>
        {songs.map((song, i) => {
          const isCurrentSong = currentMusic.song?.id === song.id && currentMusic.playlist?.id === playListId;
          return (
            <tr
              key={song.id}
              className={`${
                isCurrentSong ? "bg-white/10" : "bg-inherit"
              } group text-base font-light text-gray-300 transition-colors duration-300 hover:bg-white/10`}
            >
              <td
                className={cn(
                  "w-5 rounded-bl-lg rounded-tl-lg px-4 py-2",
                  isCurrentSong ? "text-green-500" : "text-inherit"
                )}
              >
                <span className="block w-5 group-hover:hidden">
                  {isCurrentSong && isPlaying ? <img src="/gifs/equaliser-animated-green.gif" /> : i + 1}
                </span>
                <PlayButton
                  id={playListId}
                  songId={song.id}
                  className="hidden h-[16px] min-w-[20px] max-w-[20px] place-content-start justify-start 
                  rounded-none bg-transparent p-0 group-hover:block"
                  iconClassName="text-white fill-current"
                />
              </td>
              <td className="flex gap-3 px-4 py-2">
                <picture>
                  <img src={song.image} alt={song.title} className="h-11 w-11 rounded-md" />
                </picture>
                <div className="flex flex-col">
                  <h3 className="font-bold">{song.title}</h3>
                  <span className="opacity-80">{formatArtists(song.artists)}</span>
                </div>
              </td>
              <td className="px-4 py-2">{song.album}</td>
              <td className="rounded-br-lg rounded-tr-lg px-4 py-2">{song.duration}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
