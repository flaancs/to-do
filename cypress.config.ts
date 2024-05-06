import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        env: {
            GOOGLE_USER: "username@company.com",
            GOOGLE_PW: "password",
            COOKIE_NAME: "next-auth.session-token",
            SITE_NAME: "http://localhost:3000",
        },
        baseUrl: "http://localhost:3000",
        chromeWebSecurity: false,
    },
});
