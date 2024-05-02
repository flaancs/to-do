import { TRPCError } from "@trpc/server";
import { lucia, verifyPassword } from "@packages/auth";
import { UserSchema, db } from "@packages/db";
import { z } from "zod";
import { publicProcedure } from "../../trpc/base";

export const login = publicProcedure
  .input(
    z.object({
      email: z
        .string()
        .email()
        .min(1)
        .max(255)
        .transform((v) => v.toLowerCase()),
      password: z.string().min(8).max(255),
    }),
  )
  .output(
    z.object({
      user: UserSchema.pick({
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
      }).partial({
        avatarUrl: true,
      }),
    }),
  )
  .mutation(
    async ({ input: { email, password }, ctx: { responseHeaders } }) => {
      try {
        const user = await db.user.findFirst({
          where: {
            email,
          },
        });

        if (!user || !user.hashedPassword)
          throw new TRPCError({
            code: "NOT_FOUND",
          });

        const isValidPassword = await verifyPassword(
          user.hashedPassword,
          password,
        );

        if (!isValidPassword)
          throw new TRPCError({
            code: "NOT_FOUND",
          });

        const session = await lucia.createSession(user.id, {});

        const sessionCookie = lucia.createSessionCookie(session.id);
        responseHeaders?.append("Set-Cookie", sessionCookie.serialize());

        return {
          user,
        };
      } catch (error: any) {
        console.error(error);
        throw new TRPCError({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message || "An unknown error occurred.",
        });
      }
    },
  );
