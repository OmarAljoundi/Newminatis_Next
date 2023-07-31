/** @type {import('next').NextConfig} */

const nextConfig = {
  headers: async () => {
    return [
      {
        source: "/api/(.*)",
        headers: getCorsHeaders(),
      },
      {
        source: "/(.*)",
        headers: getCacheHeaders(),
      },
    ];
  },
  swcMinify: true,
  images: {
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "newminatis.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "scontent-mxp1-1.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "scontent-mxp2-1.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "*.cdninstagram.com",
      },
    ],
  },
  modularizeImports: {
    "@mui-material": {
      transform: "@mui-material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
  },
};
const getCorsHeaders = () => {
  const headers = {};
  headers["Cache-Control"] = "public, s-maxage=86400";
  return Object.entries(headers).map(([key, value]) => ({ key, value }));
};
const getCacheHeaders = () => {
  const headers = {};

  headers["Access-Control-Allow-Origin"] = "*";
  headers["Access-Control-Allow-Credentials"] = "true";
  headers["Access-Control-Allow-Methods"] = "GET,OPTIONS,PATCH,DELETE,POST,PUT";
  headers["Access-Control-Allow-Headers"] =
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization";

  return Object.entries(headers).map(([key, value]) => ({ key, value }));
};
module.exports = nextConfig;
