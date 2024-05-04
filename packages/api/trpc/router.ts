import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import * as authProcedures from "../modules/auth";
import * as todoProcedures from "../modules/todos";
import { router } from "./base";

export const apiRouter = router({
  auth: router(authProcedures),
  todos: router(todoProcedures),
});

export type ApiRouter = typeof apiRouter;
export type ApiInput = inferRouterInputs<ApiRouter>;
export type ApiOutput = inferRouterOutputs<ApiRouter>;
