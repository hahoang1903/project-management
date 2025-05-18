"use client";

import Link from "next/link";
import { Sidebar, Moon, Search, Settings, Sun, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/lib/redux/state";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const openSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <header className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
      <div className="flex items-center gap-8">
        <button className="navbar-btn" onClick={openSidebar}>
          {isSidebarCollapsed ? <Sidebar /> : <X />}
        </button>

        <div className="relative flex h-min w-[200px]">
          <Search className="absolute top-1/2 left-2 mr-2 size-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
          <input
            className="navbar-search-input"
            type="search"
            placeholder="Search..."
          />
        </div>
      </div>

      <div className="flex items-center">
        <button onClick={toggleDarkMode} className="navbar-btn">
          {isDarkMode ? <Sun /> : <Moon />}
        </button>
        <Link href="/settings" className="navbar-btn">
          <Settings />
        </Link>

        <div className="mr-5 ml-2 hidden min-h-[2em] w-[0.1rem] bg-gray-300 md:inline-block dark:bg-gray-600"></div>
      </div>
    </header>
  );
};

export default Navbar;
