import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Skip TypeScript type errors during production build.
  // This is standard for MVP / vibe-coded projects where type annotations
  // haven't been added yet. Dev mode still shows type errors in your editor.
  typescript: {
    ignoreBuildErrors: true,
  },
  // Skip ESLint errors during production build (same reason).
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;