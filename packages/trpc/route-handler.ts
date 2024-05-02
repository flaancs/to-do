import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { apiRouter } from "./router";
import { createContext } from "./context";

export const trpcApiRouteHandler = async (req: Request) =>
    fetchRequestHandler({
      endpoint: "/api",
      req,
      router: apiRouter,
      createContext,
    });
  