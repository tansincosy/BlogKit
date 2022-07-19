import { config } from "@/appConfig";

export const actuallyAssetsPrefix = (path: string) =>
  config.siteURL ? `${config.siteURL}/${path}` : `/${path}`;

export const getActuallyImagePath = (imgPath?: string) => {
  if (!imgPath) {
    return "";
  }
  return imgPath.startsWith("/") ? actuallyAssetsPrefix(imgPath) : imgPath;
};

export default actuallyAssetsPrefix;
