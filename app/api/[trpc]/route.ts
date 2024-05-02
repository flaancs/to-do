import { trpcApiRouteHandler } from "@packages/trpc";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export { trpcApiRouteHandler as GET, trpcApiRouteHandler as POST };
