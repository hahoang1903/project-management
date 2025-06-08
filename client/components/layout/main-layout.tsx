"use client";

import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useAppSelector } from "@/lib/redux/store";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector((state) => state.ui.isDarkMode);
  const isSidebarCollapsed = useAppSelector(
    (state) => state.ui.isSidebarCollapsed,
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
        className={`dark:bg-dark-bg @container flex w-full flex-col bg-gray-50 transition-[margin-left] duration-300 ${isSidebarCollapsed ? "" : "lg:ml-[290px]"}`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
