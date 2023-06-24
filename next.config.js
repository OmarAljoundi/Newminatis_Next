/** @type {import('next').NextConfig} */
const nextConfig = {
  minimumCacheTTL: 86400,
  images: {
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

module.exports = nextConfig;
