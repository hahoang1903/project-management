import { prefetch, trpc } from "@/lib/trpc/server-utils";
import StoreProvider from "../providers/store-provider";
import TRPCProviders from "../providers/trpc-providers";
import MainLayout from "./main-layout";
import HydrateClient from "../hydrate-client";

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  prefetch(trpc.project.getAll.queryOptions());

  return (
    <TRPCProviders>
      <HydrateClient>
        <StoreProvider>
          <MainLayout>{children}</MainLayout>
        </StoreProvider>
      </HydrateClient>
    </TRPCProviders>
  );
};

export default Wrapper;
