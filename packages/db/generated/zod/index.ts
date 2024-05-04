import { z } from "zod";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
    "ReadUncommitted",
    "ReadCommitted",
    "RepeatableRead",
    "Serializable",
]);

export const UserScalarFieldEnumSchema = z.enum([
    "id",
    "email",
    "name",
    "avatarUrl",
    "hashedPassword",
    "createdAt",
    "updatedAt",
]);

export const UserSessionScalarFieldEnumSchema = z.enum([
    "id",
    "userId",
    "expiresAt",
    "createdAt",
    "updatedAt",
]);

export const UserOauthAccountScalarFieldEnumSchema = z.enum([
    "id",
    "providerId",
    "providerUserId",
    "userId",
    "createdAt",
    "updatedAt",
]);

export const UserRecoveryTokenScalarFieldEnumSchema = z.enum([
    "id",
    "userId",
    "token",
    "expiresAt",
    "createdAt",
    "updatedAt",
]);

export const TodoScalarFieldEnumSchema = z.enum([
    "id",
    "title",
    "completed",
    "userId",
    "createdAt",
    "updatedAt",
]);

export const SortOrderSchema = z.enum(["asc", "desc"]);

export const QueryModeSchema = z.enum(["default", "insensitive"]);

export const NullsOrderSchema = z.enum(["first", "last"]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
    id: z.string().cuid(),
    email: z.string(),
    name: z.string(),
    avatarUrl: z.string().nullable(),
    hashedPassword: z.string().nullable(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export type User = z.infer<typeof UserSchema>;

/////////////////////////////////////////
// USER SESSION SCHEMA
/////////////////////////////////////////

export const UserSessionSchema = z.object({
    id: z.string(),
    userId: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export type UserSession = z.infer<typeof UserSessionSchema>;

/////////////////////////////////////////
// USER OAUTH ACCOUNT SCHEMA
/////////////////////////////////////////

export const UserOauthAccountSchema = z.object({
    id: z.string().cuid(),
    providerId: z.string(),
    providerUserId: z.string(),
    userId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export type UserOauthAccount = z.infer<typeof UserOauthAccountSchema>;

/////////////////////////////////////////
// USER RECOVERY TOKEN SCHEMA
/////////////////////////////////////////

export const UserRecoveryTokenSchema = z.object({
    id: z.string().cuid(),
    userId: z.string(),
    token: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export type UserRecoveryToken = z.infer<typeof UserRecoveryTokenSchema>;

/////////////////////////////////////////
// TODO SCHEMA
/////////////////////////////////////////

export const TodoSchema = z.object({
    id: z.string().cuid(),
    title: z.string(),
    completed: z.boolean(),
    userId: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

export type Todo = z.infer<typeof TodoSchema>;