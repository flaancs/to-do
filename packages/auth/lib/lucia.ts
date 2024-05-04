import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import type { User as UserType } from "@packages/db";
import { PrismaClient } from "@prisma/client";
import { Lucia, User } from "lucia";

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type DatabaseSessionAttributes = {
    impersonatorId?: string;
};
export type DatabaseUserAttributes = UserType;

declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        DatabaseSessionAttributes: DatabaseSessionAttributes;
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

const prisma = new PrismaClient();
const adapter = new PrismaAdapter(prisma.userSession, prisma.user);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        expires: false,
        attributes: {
            secure: process.env.NODE_ENV === "production",
        },
    },
    getUserAttributes(data) {
        return {
            id: data.id,
            email: data.email,
            name: data.name,
            avatarUrl: data.avatarUrl,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        };
    },
    getSessionAttributes: (databaseSession) => {
        return {
            impersonatorId: databaseSession.impersonatorId,
        };
    },
});

export type SessionUser = User;
export { Scrypt, type Session } from "lucia";
