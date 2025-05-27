import "server-only";
import { getQueryClient } from "@/lib/trpc/server-utils";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const HydrateClient = ({ children }: { children: React.ReactNode }) => {
  const queryClient = getQueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
};

export default HydrateClient;
