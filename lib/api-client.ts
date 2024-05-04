import { ApiRouter } from "@packages/api/trpc/router";
import { createTRPCReact } from "@trpc/react-query";

export const apiClient = createTRPCReact<ApiRouter>();
