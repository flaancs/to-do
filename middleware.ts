import { authConfig } from "@packages/auth";
import NextAuth from "next-auth";
import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
    locales: ["en", "es"],
    defaultLocale: "en",
    localePrefix: "never",
});

const withAuth = NextAuth(authConfig).auth;

async function middleware(req: NextRequest) {
    return intlMiddleware(req);
}

export default withAuth(middleware);

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
