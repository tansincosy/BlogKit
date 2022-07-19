const Package = require("./package.json");

/** @type {import('next').NextConfig} */
const isProduction = "production" === `${process.env.NODE_ENV}`;
const basePath = isProduction ? `/${Package.name}` : "";

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  //资源根路径
  basePath,
  env: {
    ASSETS_PREFIX: basePath,
    BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
