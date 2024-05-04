import { db } from "@packages/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../trpc/base";

export const deleteTodo = protectedProcedure
    .input(
        z.object({
            id: z.string(),
        }),
    )
    .output(z.void())
    .mutation(async ({ input: { id }, ctx: { user } }) => {
        try {
            const todoToDelete = await db.todo.findFirst({
                where: {
                    id,
                },
            });

            if (!todoToDelete) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Todo not found.",
                });
            }

            if (todoToDelete.userId !== user.id) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You are not authorized to perform this action.",
                });
            }

            await db.todo.delete({
                where: {
                    id,
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
