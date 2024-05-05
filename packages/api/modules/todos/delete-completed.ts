import { db } from "@packages/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../trpc/base";

export const deleteCompleted = protectedProcedure
    .output(z.void())
    .mutation(async ({ ctx: { user } }) => {
        try {
            await db.todo.deleteMany({
                where: {
                    userId: user.id,
                    completed: true,
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
