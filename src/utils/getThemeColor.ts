import { getColor } from "colorthief";
import { rgbToHex } from "./index";

export async function getThemeColor(imageSrc: string): Promise<string> {
  if (!imageSrc) {
    return "#066bf8";
  }
  const rgb = await getColor(imageSrc);
  return rgbToHex(rgb);
}
