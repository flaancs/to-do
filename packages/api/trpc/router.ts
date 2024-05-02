import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "./base";
import * as authProcedures from "../modules/auth";

export const apiRouter = router({
  auth: router(authProcedures),
});

export type ApiRouter = typeof apiRouter;
export type ApiInput = inferRouterInputs<ApiRouter>;
export type ApiOutput = inferRouterOutputs<ApiRouter>;
