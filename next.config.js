/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "media-1.api-sports.io",
      "media-2.api-sports.io",
      "media-3.api-sports.io",
    ],
  },
};

// module.exports = nextConfig;

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

module.exports = withPWA(nextConfig);
