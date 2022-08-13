export const actuallyAssetsPrefix = (path: string) =>
  process.env.NEXT_PUBLIC_BLOG_SITE_URL
    ? `${process.env.NEXT_PUBLIC_BLOG_SITE_URL}/${path}`
    : `${path}`;

export const getActuallyImagePath = (imgPath?: string) => {
  if (!imgPath) {
    return "";
  }
  return imgPath.startsWith("/") ? actuallyAssetsPrefix(imgPath) : imgPath;
};

export default actuallyAssetsPrefix;
