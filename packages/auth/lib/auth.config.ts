import { PrismaAdapter } from "@auth/prisma-adapter";
import { Pool } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { z } from "zod";

const neon = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaNeon(neon);
const prisma = new PrismaClient({ adapter });

export const authConfig = {
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    jwt: {
        // @ts-expect-error
        secret: process.env.JWT_SECRET as string,
        maxAge: 15 * 24 * 30 * 60, // 15 days
    },
    providers: [
        Github,
        Google,
        Credentials({
            authorize: async (credentials) => {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(6),
                    })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await prisma.user.findFirst({
                        where: { email },
                    });

                    if (!user || user.password === null) {
                        return null;
                    }

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password,
                    );

                    if (passwordsMatch) return user;
                }

                return null;
            },
        }),
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },
        session: async ({ session, token }) => {
            if (token) {
                session.user = token.user as any;
            }

            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith("/todos");
            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return Response.redirect(new URL("/auth/login", nextUrl));
            } else if (isLoggedIn) {
                return Response.redirect(new URL("/todos", nextUrl));
            }
            return true;
        },
    },
    pages: {
        signIn: "/auth/login",
        newUser: "/auth/signup",
    },
} satisfies NextAuthConfig;
