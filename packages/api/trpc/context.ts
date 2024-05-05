import { auth } from "@packages/auth";

export async function createContext() {
    const session = await auth();

    return {
        user: session?.user ?? null,
        session,
    };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
