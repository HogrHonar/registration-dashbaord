import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["google-auth-library", "google-spreadsheet"],
  experimental: {
    serverActions: {
      allowedOrigins: ["reg.btvi.edu.iq", "localhost:4000", "127.0.0.1:4000"],
    },
  },
};

export default nextConfig;
