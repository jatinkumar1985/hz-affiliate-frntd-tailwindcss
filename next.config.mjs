/** @type {import('next').NextConfig} */

// Load environment variables in a clear, early manner
import loadEnv from "./env-loader.js";
loadEnv(process.env.APP_ENV ?? "development");

// Configurable constants for clarity and easier change
const BASE_PATH = "/your-picks";
const CACHE_COMPONENTS = true;
const IMAGE_HOST = "img.jagranreviews.com";
const RSS_DESTINATIONS = [
    { source: '/rss', destination: '/sitemap/rss' },
    { source: '/rss/:category.xml', destination: '/sitemap/rss-category' }
];
const CACHE_HEADERS = [
    {
        key: "Cache-Control",
        value: "no-store, must-revalidate"
    }
];

// Export Next.js config with optimized structure
const nextConfig = {
    basePath: BASE_PATH,
    cacheComponents: CACHE_COMPONENTS,
    images: {
        unoptimized: true,
        minimumCacheTTL: 10,
        remotePatterns: [
            {
                protocol: "https",
                hostname: IMAGE_HOST,
                pathname: "/**"
            }
        ]
    },
    // Use direct reference to the array for conciseness
    rewrites: async () => RSS_DESTINATIONS,
    headers: async () => [
        {
            source: "/:path*",
            headers: CACHE_HEADERS
        }
    ]
};

export default nextConfig;
