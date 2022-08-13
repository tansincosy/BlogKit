const { generateRss } = require("./src/scripts/generate_rss.js");
const { generateSearchResult } = require("./src/scripts/save_search_key.js");
const chalk = require("chalk");
const isProduction = "production" === `${process.env.NODE_ENV}`;

const LOG_INFO = (...rest) => {
  return console.log(chalk.blue("info"), " - ", ...rest);
};
const getAppConfig = (...envKeys) => {
  if (envKeys.length === 0) {
    return {};
  }
  return envKeys.reduce((total, current) => {
    const value = process.env[current];
    LOG_INFO(`get ${current} has ${!!value ? "value" : "no value"}`);
    if (value) {
      total[current] = value;
    }
    return total;
  }, {});
};

async function generateModule() {
  if (isProduction) {
    LOG_INFO("begin generate rss");
    const blogConfig = getAppConfig(
      "BLOG_TITLE",
      "BLOG_SUBTITLE",
      "BLOG_SITE_URL"
    );

    await generateRss({
      title: blogConfig.BLOG_TITLE,
      subtitle: blogConfig.BLOG_SUBTITLE,
      siteURL: blogConfig.BLOG_SITE_URL,
    });
    LOG_INFO("begin generate rss successfully");
    LOG_INFO("begin generate search");
    await generateSearchResult(
      getAppConfig(
        "NEXT_PUBLIC_ALGOLIA_APP_ID",
        "NEXT_PUBLIC_ALGOLIA_ADMIN_KEY",
        "NEXT_PUBLIC_ALGOLIA_INDEX_NAME"
      )
    );
    LOG_INFO("begin generate search successfully");
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
