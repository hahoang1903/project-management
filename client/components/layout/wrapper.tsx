"use client";

import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import StoreProvider from "../providers/store-provider";
import TRPCProviders from "../providers/trpc-providers";
import { useAppSelector } from "@/lib/redux/store";

const WrapperLayout = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`dark:bg-dark-bg flex w-full flex-col bg-gray-50 transition-[margin-left] duration-300 ${isSidebarCollapsed ? "" : "ml-64"}`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <TRPCProviders>
      <StoreProvider>
        <WrapperLayout>{children}</WrapperLayout>
      </StoreProvider>
    </TRPCProviders>
  );
};

export default Wrapper;
