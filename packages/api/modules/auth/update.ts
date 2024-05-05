import { db } from "@packages/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { protectedProcedure } from "../../trpc/base";

export const update = protectedProcedure
    .input(
        z.object({
            name: z.string().optional(),
            password: z.string().optional(),
            passwordConfirmation: z.string().optional(),
        }),
    )
    .output(z.void())
    .mutation(
        async ({
            input: { name, password, passwordConfirmation },
            ctx: { user },
        }) => {
            try {
                if (password && password !== passwordConfirmation) {
                    throw new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Passwords do not match.",
                    });
                }

                let hashedPassword;
                if (password) {
                    hashedPassword = await bcrypt.hash(password, 10);
                }

                await db.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        name,
                        ...(password && {
                            password: hashedPassword,
                        }),
                    },
                });
            } catch (error: any) {
                console.error(error);
                throw new TRPCError({
                    code: error.code || "INTERNAL_SERVER_ERROR",
                    message: error.message || "An unknown error occurred.",
                });
            }
        },
    );
