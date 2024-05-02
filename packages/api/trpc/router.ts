import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "./base";
import * as authProcedures from "../modules/auth";
import * as taskProcedures from "../modules/tasks";

export const apiRouter = router({
  auth: router(authProcedures),
  tasks: router(taskProcedures),
});

export type ApiRouter = typeof apiRouter;
export type ApiInput = inferRouterInputs<ApiRouter>;
export type ApiOutput = inferRouterOutputs<ApiRouter>;
