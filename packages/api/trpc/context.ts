import { lucia } from "@packages/auth";
import { cookies } from "next/headers";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export async function createContext(
  params?: FetchCreateContextFnOptions | { isAdmin?: boolean },
) {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  const { user, session } = sessionId
    ? await lucia.validateSession(sessionId)
    : { user: null, session: null };

  return {
    user,
    session,
    responseHeaders:
      params && "resHeaders" in params ? params.resHeaders : undefined,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
