/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  output:
    process.env.NEXT_BUILD_OUTPUT_TYPE === "standalone"
      ? "standalone"
      : "export",
};

module.exports = nextConfig;
