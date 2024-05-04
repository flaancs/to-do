import { db } from "@packages/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../trpc/base";

export const deleteTask = protectedProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .output(z.void())
  .mutation(async ({ input: { id }, ctx: { user } }) => {
    try {
      const taskToDelete = await db.task.findFirst({
        where: {
          id,
        },
      });

      if (!taskToDelete) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Task not found.",
        });
      }

      if (taskToDelete.userId !== user.id) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "You are not authorized to perform this action.",
        });
      }

      await db.task.delete({
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
