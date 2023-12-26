export function formatArtists(artists: string[]) {
  const formatter = new Intl.ListFormat("es", {
    style: "short",
    type: "unit"
  });
  const artistsString = formatter.format(artists);
  return artistsString;
}
