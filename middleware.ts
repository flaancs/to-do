import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
    locales: ["en", "es"],
    defaultLocale: "en",
    localePrefix: "never",
});

export default async function middleware(req: NextRequest) {
    return intlMiddleware(req);
}

export const config = {
    matcher: ["/((?!api|_next|.*\\..*).*)"],
};
