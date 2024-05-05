import { db } from "@packages/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { publicProcedure } from "../../trpc/base";

export const setPassword = publicProcedure
    .input(
        z.object({
            token: z.string(),
            password: z.string().min(8).max(255),
            passwordConfirm: z.string().min(8).max(255),
        }),
    )
    .output(z.void())
    .mutation(async ({ input: { token, password, passwordConfirm } }) => {
        try {
            if (password !== passwordConfirm) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Passwords do not match.",
                });
            }

            const recoveryToken = await db.userRecoveryToken.findUnique({
                where: {
                    token,
                    expiresAt: {
                        gte: new Date(),
                    },
                },
                select: {
                    userId: true,
                },
            });

            if (!recoveryToken) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Invalid or expired token.",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            await db.user.update({
                where: {
                    id: recoveryToken.userId,
                },
                data: {
                    password: hashedPassword,
                },
            });

            await db.userRecoveryToken.delete({
                where: {
                    token,
                },
            });
        } catch (error: any) {
            console.error(error);
            throw new TRPCError({
                code: error.code || "INTERNAL_SERVER_ERROR",
                message: error.message || "An unknown error occurred.",
            });
        }
    });
