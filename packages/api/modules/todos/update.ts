import { TodoSchema, db } from "@packages/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../trpc/base";

export const update = protectedProcedure
    .input(
        z.object({
            id: z.string(),
            title: z.string().optional(),
            completed: z.boolean().optional(),
        }),
    )
    .output(TodoSchema)
    .mutation(async ({ input: { id, title, completed }, ctx: { user } }) => {
        try {
            const todo = await db.todo.findFirst({
                where: {
                    id,
                },
            });

            if (!todo) {
                throw new TRPCError({
                    code: "NOT_FOUND",
                    message: "Todo not found.",
                });
            }

            if (todo.userId !== user.id) {
                throw new TRPCError({
                    code: "FORBIDDEN",
                    message: "You are not authorized to perform this action.",
                });
            }

            const updatedTodo = await db.todo.update({
                where: {
                    id,
                },
                data: {
                    title,
                    completed,
                },
            });

            return updatedTodo;
        } catch (error: any) {
            console.error(error);
            throw new TRPCError({
                code: error.code || "INTERNAL_SERVER_ERROR",
                message: error.message || "An unknown error occurred.",
            });
        }
    });
