const { generateRss } = require("./src/scripts/generate_rss.js");
const { generateSearchResult } = require("./src/scripts/save_search_key.js");
const isProduction = "production" === `${process.env.NODE_ENV}`;

async function generateModule() {
  if (isProduction) {
    console.log("begin generate rss");
    await generateRss({
      title: "blogKit",
      subtitle: "blogKit subtitle",
      siteURL: "https://tansincosy.github.io/BlogKit/",
    });
    console.log("begin generate rss successfully");
    console.log("begin generate search");
    await generateSearchResult({
      searchNameSpace: "blog",
      appKey: "8M6OVN93T7",
      adminKey: "94db0de8ad6ab305ba60487981ffa5fc",
    });
    console.log("begin generate search successfully");
  }
}
generateModule();

const basePath = isProduction ? "/BlogKit" : "";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: isProduction,
  //资源根路径
  basePath,
};
module.exports = nextConfig;
