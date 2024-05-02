import { createHTTPHandler } from "@trpc/server/adapters/standalone";
import { t } from "./base";
import { createContext } from "./context";
import { apiRouter } from "./router";

export const createApiCaller = async () => {
  const createCaller = t.createCallerFactory(apiRouter);
  return createCaller(await createContext());
};

export const createHttpHandler = async () => {
  const handler = createHTTPHandler({
    router: apiRouter,
    createContext: async () => createContext(),
  });
  return handler;
};
