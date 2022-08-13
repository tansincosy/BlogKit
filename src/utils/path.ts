import { siteURL } from "@/config";

export const actuallyAssetsPrefix = (path: string) =>
  siteURL ? `${siteURL}/${path}` : `${path}`;

export const getActuallyImagePath = (imgPath?: string) => {
  if (!imgPath) {
    return "";
  }
  return imgPath.startsWith("/") ? actuallyAssetsPrefix(imgPath) : imgPath;
};

export default actuallyAssetsPrefix;
