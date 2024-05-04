import { TRPCError } from "@trpc/server";
import { TaskSchema, db } from "@packages/db";
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
  .output(TaskSchema)
  .mutation(async ({ input: { id, title, completed }, ctx: { user } }) => {
    try {
      const task = await db.task.findFirst({
        where: {
          id,
        },
      });

      if (!task) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Task not found.",
        });
      }

      if (task.userId !== user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to perform this action.",
        });
      }

      const updatedTask = await db.task.update({
        where: {
          id,
        },
        data: {
          title,
          completed,
        },
      });

      return updatedTask;
    } catch (error: any) {
      console.error(error);
      throw new TRPCError({
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message || "An unknown error occurred.",
      });
    }
  });
