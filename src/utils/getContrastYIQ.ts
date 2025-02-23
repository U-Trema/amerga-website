/**
 * Determines whether black or white text would have better contrast over a given hex color.
 *
 * @param color The hex color code as a string (e.g., "#RRGGBB").
 * @return "black" if black text has better contrast, or "white" if white text has better contrast.
 */
export function getContrastYIQ(color: string): "black" | "white" {
  const hex = color.replace("#", "");
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}
