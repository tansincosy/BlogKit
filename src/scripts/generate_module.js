const { generateRss } = require("./generate_rss");
const { generateSearchResult } = require("./save_search_key");
const { LOG_INFO } = require("./log");
const isProduction = "production" === `${process.env.NODE_ENV}`;

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

const generateModule = async () => {
  if (isProduction) {
    LOG_INFO("begin generate rss");
    const blogConfig = getAppConfig(
      "NEXT_PUBLIC_BLOG_TITLE",
      "NEXT_PUBLIC_BLOG_SUBTITLE",
      "NEXT_PUBLIC_RSS_URL"
    );

    await generateRss({
      title: blogConfig.NEXT_PUBLIC_BLOG_TITLE,
      subtitle: blogConfig.NEXT_PUBLIC_BLOG_SUBTITLE,
      siteURL: blogConfig.NEXT_PUBLIC_RSS_URL,
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
  }
};

module.exports = {
  generateModule,
};
