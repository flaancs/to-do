import { sortTasks } from "@lib/utils";
import { TaskSchema, db } from "@packages/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../trpc/base";

export const findAll = protectedProcedure
  .output(z.array(TaskSchema))
  .query(async ({ ctx: { user } }) => {
    try {
      const tasks = await db.task.findMany({
        where: {
          userId: user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
      return sortTasks(tasks);
    } catch (error: any) {
      console.error(error);
      throw new TRPCError({
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message || "An unknown error occurred.",
      });
    }
  });
