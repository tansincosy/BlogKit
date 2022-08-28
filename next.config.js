const { generateModule } = require("./src/scripts/generate_module");
const { LOG_INFO, LOG_ERROR } = require("./src/scripts/log");
const isProduction = "production" === `${process.env.NODE_ENV}`;

const basePath = isProduction ? process.env.NEXT_PUBLIC_BLOG_BASE_PATH : "";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: isProduction,
  //资源根路径
  basePath,
};
module.exports = nextConfig;

(async () => {
  try {
    await generateModule();
    LOG_INFO("generate module successfully");
  } catch (error) {
    LOG_ERROR("generate failed error", error);
  }
})();
