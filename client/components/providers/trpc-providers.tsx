"use client";

import type { AppRouter } from "server/routers";
import React, { useState } from "react";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import { makeQueryClient } from "@/lib/trpc/query-client";

let browserQueryClient: ReturnType<typeof makeQueryClient>;
const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
};

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();

const TRPCProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  const [trpcClient] = useState(() =>
    createTRPCClient<AppRouter>({
      links: [
        httpBatchLink({
          url: process.env.NEXT_PUBLIC_TRPC_URL!,
        }),
      ],
    }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
};

export default TRPCProviders;
