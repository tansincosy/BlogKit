const package = require("./package.json");
/** @type {import('next').NextConfig} */

const isProduction = "production" === `${process.env.NODE_ENV}`;
const basePath = isProduction ? `/${package.name}` : "";

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  swcMinify: true,
  basePath,
};

module.exports = nextConfig;
