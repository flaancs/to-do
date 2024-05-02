import { t } from "./base";
import { createContext } from "./context";
import { apiRouter } from "./router";

export const createApiCaller = async () => {
  const createCaller = t.createCallerFactory(apiRouter);
  return createCaller(await createContext());
};
