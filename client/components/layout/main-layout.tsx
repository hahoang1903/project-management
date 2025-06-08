"use client";

import React, { useEffect } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useAppSelector } from "@/lib/redux/store";
import {
  selectIsDarkMode,
  selectIsSidebarCollapsed,
} from "@/lib/redux/selector";
import { ToastContainer, Slide } from "react-toastify";
import { TOAST_DISPLAY_TIMEOUT } from "@/lib/const";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const isDarkMode = useAppSelector(selectIsDarkMode);
  const isSidebarCollapsed = useAppSelector(selectIsSidebarCollapsed);

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
      <ToastContainer
        position="bottom-right"
        autoClose={TOAST_DISPLAY_TIMEOUT}
        newestOnTop
        closeOnClick
        draggable={false}
        theme={isDarkMode ? "dark" : "light"}
        transition={Slide}
      />
    </div>
  );
};

export default MainLayout;
