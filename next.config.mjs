import { withSentryConfig } from "@sentry/nextjs";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    async redirects() {
        return [
            {
                source: "/",
                destination: "/todos",
                permanent: true,
            },
        ];
    },
};

export default withSentryConfig(
    withNextIntl(nextConfig),
    {
        silent: true,
        org: "todo-5i",
        project: "todo",
    },
    {
        widenClientFileUpload: true,
        transpileClientSDK: true,
        hideSourceMaps: true,
        disableLogger: true,
        automaticVercelMonitors: true,
        automaticVercelMonitors: true,
    },
);
