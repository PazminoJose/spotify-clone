interface CurrentSongProps {
  image?: string;
  title?: string;
  artists?: string[];
}

export default function CurrentSong({ image, title, artists }: CurrentSongProps) {
  return (
    <div className="relative flex max-w-md items-center gap-5 overflow-hidden">
      <picture className="h-16 w-16 overflow-hidden rounded-md bg-zinc-800 shadow-lg">
        <img src={image} alt={title} />
      </picture>
      <div className="flex flex-col">
        <h3 className="block max-w-xs text-sm font-semibold">{title}</h3>
        <span className="text-xs opacity-80">{artists?.join(", ")}</span>
      </div>
    </div>
  );
}
