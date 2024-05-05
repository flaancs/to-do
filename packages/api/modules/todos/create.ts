import { TodoSchema, db } from "@packages/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../trpc/base";

export const create = protectedProcedure
    .input(
        z.object({
            title: z.string(),
        }),
    )
    .output(TodoSchema)
    .mutation(async ({ input: { title }, ctx: { user } }) => {
        try {
            const createdTodo = await db.todo.create({
                data: {
                    title: title.trim(),
                    userId: user.id!,
                    completed: false,
                },
            });

            return createdTodo;
        } catch (error: any) {
            console.error(error);
            throw new TRPCError({
                code: error.code || "INTERNAL_SERVER_ERROR",
                message: error.message || "An unknown error occurred.",
            });
        }
    });
