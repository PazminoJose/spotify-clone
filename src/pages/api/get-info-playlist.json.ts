import { allPlaylists, songs as allSongs } from "@/lib/data";
import type { APIContext } from "astro";

export function GET({ request }: APIContext) {
  const { url } = request;
  const urlObject = new URL(url);
  const id = urlObject.searchParams.get("id");
  const playlist = allPlaylists.find((playlist) => playlist.id === id);
  const songs = allSongs.filter((song) => song.albumId === playlist?.albumId);
  return new Response(JSON.stringify({ playlist, songs }), {
    headers: { "Content-Type": "application/json" }
  });
}
