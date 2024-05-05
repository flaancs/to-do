import { db } from "@packages/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcryptjs";
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
            status: z.number(),
            message: z.string(),
            result: z.string().nullable(),
        }),
    )
    .mutation(async ({ input: { email, password, passwordConfirm, name } }) => {
        try {
            const exists = await db.user.findUnique({
                where: {
                    email,
                },
            });

            if (exists) {
                throw new TRPCError({
                    code: "CONFLICT",
                    message: "User already exists.",
                });
            }

            if (password !== passwordConfirm) {
                throw new TRPCError({
                    code: "BAD_REQUEST",
                    message: "Passwords do not match.",
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await db.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                    emailVerified: null,
                },
            });

            return {
                status: 201,
                message: "Account created successfully",
                result: user.email,
            };
        } catch (error: any) {
            console.error(error);
            throw new TRPCError({
                code: error.code || "INTERNAL_SERVER_ERROR",
                message: error.message || "An unknown error occurred.",
            });
        }
    });
