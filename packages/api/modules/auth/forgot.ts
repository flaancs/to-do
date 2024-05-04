import { sendEmail } from "@lib/emails";
import { generateToken } from "@lib/utils";
import { db } from "@packages/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure } from "../../trpc/base";

export const forgot = publicProcedure
    .input(
        z.object({
            email: z
                .string()
                .email()
                .min(1)
                .max(255)
                .transform((v) => v.toLowerCase()),
        }),
    )
    .output(z.void())
    .mutation(async ({ input: { email } }) => {
        try {
            const user = await db.user.findFirst({
                where: {
                    email,
                    hashedPassword: {
                        not: null,
                    },
                },
            });

            if (user) {
                const token = generateToken(32);
                const recoveryToken = await db.userRecoveryToken.create({
                    data: {
                        token,
                        userId: user.id,
                        expiresAt: new Date(Date.now() + 1000 * 60 * 10), // 10 minutes
                    },
                });

                await sendEmail({
                    template: "recovery",
                    to: email,
                    variables: {
                        name: user.name,
                        url: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/recovery?token=${recoveryToken.token}`,
                    },
                });
            }
        } catch (error: any) {
            console.error(error);
            throw new TRPCError({
                code: error.code || "INTERNAL_SERVER_ERROR",
                message: error.message || "An unknown error occurred.",
            });
        }
    });
