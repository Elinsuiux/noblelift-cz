import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const isStaticExport = process.env.STATIC_EXPORT === "1";
const VZV_GREEN_ORIGIN = "https://temporary-rapid-breeze-8ofpwza.vercel.app";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: {
          unoptimized: true,
        },
      }
    : {
        async rewrites() {
          return {
            fallback: [
              {
                source: "/pages/:path*",
                destination: `${VZV_GREEN_ORIGIN}/pages/:path*`,
              },
              {
                source: "/assets/:path*",
                destination: `${VZV_GREEN_ORIGIN}/assets/:path*`,
              },
            ],
          };
        },
      }),
  // Allow dev assets (/_next/*, HMR) when tunneling via ngrok / similar tools.
  allowedDevOrigins: [
    "*.ngrok-free.dev",
    "*.ngrok-free.app",
    "*.ngrok.io",
    "*.ngrok.app",
  ],
};

export default withNextIntl(nextConfig);
