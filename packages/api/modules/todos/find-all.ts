import { sortTodos } from "@lib/utils";
import { TodoSchema, db } from "@packages/db";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure } from "../../trpc/base";

export const findAll = protectedProcedure
  .output(z.array(TodoSchema))
  .query(async ({ ctx: { user } }) => {
    try {
      const todos = await db.todo.findMany({
        where: {
          userId: user.id,
        }
      });
      return sortTodos(todos);
    } catch (error: any) {
      console.error(error);
      throw new TRPCError({
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message || "An unknown error occurred.",
      });
    }
  });
