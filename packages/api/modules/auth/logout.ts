import { TRPCError } from "@trpc/server";
import { lucia } from "@packages/auth";
import { z } from "zod";
import { protectedProcedure } from "../../trpc/base";

export const logout = protectedProcedure
  .input(z.void())
  .mutation(async ({ ctx: { session, responseHeaders } }) => {
    try {
      await lucia.invalidateSession(session.id);
      const sessionCookie = lucia.createBlankSessionCookie();
      responseHeaders?.append("Set-Cookie", sessionCookie.serialize());
    } catch (error: any) {
      console.error(error);
      throw new TRPCError({
        code: error.code || "INTERNAL_SERVER_ERROR",
        message: error.message || "An unknown error occurred.",
      });
    }
  });
