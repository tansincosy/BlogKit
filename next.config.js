const { buildBasePath } = require("./config");
const isProduction = "production" === `${process.env.NODE_ENV}`;
const basePath = isProduction ? buildBasePath : "";
console.log("basePath", basePath);
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: isProduction,
  //资源根路径
  basePath,
};

module.exports = nextConfig;
