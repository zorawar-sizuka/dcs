/** @type {import('next').NextConfig} */
const nextConfig = { 
  /* config options here */ 
  images: {
    // This allows the optimizer to process the 85 quality you requested
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75, 85, 100], 
  },
  reactCompiler: true,
};

export default nextConfig;
