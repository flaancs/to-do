import { TRPCError } from "@trpc/server";
import { hashPassword, lucia } from "@packages/auth";
import { UserSchema, db } from "@packages/db";
import { z } from "zod";
import { publicProcedure } from "@packages/trpc";

export const signup = publicProcedure
  .input(
    z.object({
      email: z
        .string()
        .email()
        .min(1)
        .max(255)
        .transform((v) => v.toLowerCase()),
      password: z.string().min(8).max(255),
      name: z.string().min(1).max(255),
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
    async ({
      input: { email, password, name },
      ctx: {responseHeaders}
    }) => {
      try {
        const hashedPassword = await hashPassword(password);
        const user = await db.user.create({
          data: {
            email,
            name,
            hashedPassword,
          },
          select: {
            id: true,
            email: true,
            name: true,
            avatarUrl: true,
          }
        });

        const session = await lucia.createSession(user.id, {});

        const sessionCookie = lucia.createSessionCookie(session.id);
        responseHeaders?.append("Set-Cookie", sessionCookie.serialize());
  
        return {
          user,
        };
      } catch (e) {
        console.error(e);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "An unknown error occurred.",
        });
      }
    },
  );
