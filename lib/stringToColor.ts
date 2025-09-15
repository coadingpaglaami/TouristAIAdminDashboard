export function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.floor((Math.abs(hash) % 360)); // hue value
  return `hsl(${color}, 70%, 60%)`; // nice pastel-ish colors
}