import createMiddleware from "next-intl/middleware";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
    locales: ["en", "es"],
    defaultLocale: "en",
    localePrefix: "never",
});

export default function middleware(req: NextRequest) {
    return intlMiddleware(req);
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
