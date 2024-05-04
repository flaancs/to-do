import { hashPassword, lucia } from "@packages/auth";
import { UserSchema, db } from "@packages/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure } from "../../trpc/base";

export const signup = publicProcedure
    .input(
        z.object({
            email: z
                .string()
                .email()
                .min(1)
                .max(255)
                .transform((v) => v.toLowerCase()),
            password: z.string().min(8).max(255),
            passwordConfirm: z.string().min(8).max(255),
            name: z.string().min(1).max(255),
        }),
    )
    .output(
        z.object({
            user: UserSchema.pick({
                id: true,
                email: true,
                name: true,
                avatarUrl: true,
            }),
        }),
    )
    .mutation(
        async ({
            input: { email, password, passwordConfirm, name },
            ctx: { responseHeaders },
        }) => {
            try {
                if (password !== passwordConfirm) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Passwords do not match.",
                    });
                }

                const hashedPassword = await hashPassword(password);
                const user = await db.user.create({
                    data: {
                        email,
                        name,
                        hashedPassword,
                    },
                    select: {
                        id: true,
                        email: true,
                        name: true,
                        avatarUrl: true,
                    },
                });

                const session = await lucia.createSession(user.id, {});

                const sessionCookie = lucia.createSessionCookie(session.id);
                responseHeaders?.append(
                    "Set-Cookie",
                    sessionCookie.serialize(),
                );

                return {
                    user,
                };
            } catch (error: any) {
                console.error(error);
                throw new TRPCError({
                    code: error.code || "INTERNAL_SERVER_ERROR",
                    message: error.message || "An unknown error occurred.",
                });
            }
        },
    );
