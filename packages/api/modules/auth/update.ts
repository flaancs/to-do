import { TRPCError } from "@trpc/server";
import { hashPassword } from "@packages/auth";
import { UserSchema, db } from "@packages/db";
import { z } from "zod";
import { protectedProcedure } from "../../trpc/base";

export const login = protectedProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string().optional(),
      password: z.string().optional(),
      passwordConfirmation: z.string().optional(),
    }),
  )
  .output(
    UserSchema.pick({
      id: true,
      email: true,
      name: true,
      avatarUrl: true,
    }).partial({
      avatarUrl: true,
    }),
  )
  .mutation(
    async ({
      input: { id, name, password, passwordConfirmation },
      ctx: { user },
    }) => {
      try {
        if (id !== user.id) {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "You are not authorized to perform this action.",
          });
        }

        let newPassword = password;
        if (newPassword && newPassword !== passwordConfirmation) {
          throw new TRPCError({
            code: "BAD_REQUEST",
            message: "Passwords do not match.",
          });
        }

        const updatedUser = await db.user.update({
          where: {
            id,
          },
          data: {
            name,
            ...(newPassword && {
              password: await hashPassword(newPassword),
            }),
          },
        });

        return updatedUser;
      } catch (error: any) {
        console.error(error);
        throw new TRPCError({
          code: error.code || "INTERNAL_SERVER_ERROR",
          message: error.message || "An unknown error occurred.",
        });
      }
    },
  );
