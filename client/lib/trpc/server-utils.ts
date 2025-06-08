import "server-only";

import type { AppRouter } from "server/routers";
import {
  createTRPCOptionsProxy,
  TRPCQueryOptions,
  type inferOutput,
} from "@trpc/tanstack-react-query";
import { cache } from "react";
import { makeQueryClient } from "./query-client";
import { createTRPCClient, httpBatchLink } from "@trpc/client";

export const getQueryClient = cache(makeQueryClient);

export const trpc = createTRPCOptionsProxy({
  client: createTRPCClient<AppRouter>({
    links: [httpBatchLink({ url: process.env.NEXT_PUBLIC_TRPC_URL! })],
  }),
  queryClient: getQueryClient,
});

export const prefetch = <T extends ReturnType<TRPCQueryOptions<any>>>(
  queryOptions: T,
) => {
  const queryClient = getQueryClient();
  if (queryOptions.queryKey[1]?.type === "infinite") {
    void queryClient.prefetchInfiniteQuery(queryOptions as any);
  } else {
    void queryClient.prefetchQuery(queryOptions);
  }
};

export type Project = inferOutput<typeof trpc.project.getAll>[number];
export type Task = inferOutput<typeof trpc.task.getByProject>[number];
export type TaskStatus = Task["status"];
export type TaskPriority = Task["priority"];
