import { UserSchema } from "@packages/db";
import { z } from "zod";
import { publicProcedure } from "../../trpc/base";

export const user = publicProcedure
    .input(z.void())
    .output(UserSchema.omit({ hashedPassword: true }).nullable())
    .query(async ({ ctx: { user } }) => {
        if (user) return user;
        return null;
    });
