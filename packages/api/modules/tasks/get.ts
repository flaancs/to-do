import { TRPCError } from "@trpc/server";
import { TaskSchema, db } from "@packages/db";
import { z } from "zod";
import { protectedProcedure } from "../../trpc/base";

export const get = protectedProcedure
  .output(z.array(TaskSchema))
  .mutation(async ({ ctx: { user } }) => {
    try {
      const tasks = await db.task.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
          completed: "asc",
        },
      });
      return tasks;
    } catch (error: any) {
      console.error(error);
      throw new TRPCError({
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message || "An unknown error occurred.",
      });
    }
  });
