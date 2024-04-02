/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  //   async headers() {
  //     return [
  //       {
  //         source: "/(.*)",
  //         headers: [{ key: "Cross-Origin-Opener-Policy", value: "http://localhost:3000" }],
  //       },
  //     ];
  //   },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups", // "same-origin-allow-popups"
          },
        ],
      }
    ];
  },
};

export default nextConfig;
