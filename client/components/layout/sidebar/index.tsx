"use client";

import { useAppSelector } from "@/lib/redux/store";
import {
  AlertCircle,
  Briefcase,
  CircleArrowDown,
  CircleArrowUp,
  DiamondMinus,
  Home,
  Layers3,
  Lock,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import SidebarLink, { type SidebarLinkProps } from "./link";
import SidebarFoldableSection from "./foldable-section";
import { usePathname } from "next/navigation";

const sidebarLinks: SidebarLinkProps[] = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/timeline", icon: Briefcase, label: "Timeline" },
  { href: "/search", icon: Search, label: "Search" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/users", icon: User, label: "Users" },
  { href: "/teams", icon: Users, label: "Teams" },
];

const priorityLinks: SidebarLinkProps[] = [
  { href: "/priority/urgent", icon: AlertCircle, label: "Urgent" },
  { href: "/priority/high", icon: CircleArrowUp, label: "High" },
  { href: "/priority/medium", icon: DiamondMinus, label: "Medium" },
  { href: "/priority/low", icon: CircleArrowDown, label: "Low" },
  { href: "/priority/backlog", icon: Layers3, label: "Backlog" },
];

const Sidebar = () => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const pathname = usePathname();

  const isPriorityExpanded = priorityLinks.some(
    ({ href }) => pathname === href,
  );

  return (
    <aside className={`sidebar ${isSidebarCollapsed ? "-left-64" : "left-0"}`}>
      <div className="flex size-full flex-col justify-start">
        <div className="z-50 flex h-16 w-64 items-center justify-between bg-white pl-6 dark:bg-black">
          <div className="text-xl font-bold text-gray-800 dark:text-white">
            Todooz
          </div>
        </div>

        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image src="/logo.png" alt="logo" width={40} height={40} />
          <div>
            <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
              TEST TEAM
            </h3>
            <div className="mt-1 flex items-center gap-2">
              <Lock className="mt-[0.1rem] size-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>

        <nav className="z-10 w-full">
          {sidebarLinks.map((linkProps) => (
            <SidebarLink key={linkProps.href} {...linkProps} />
          ))}
        </nav>

        <SidebarFoldableSection title="Projects">
          <></>
        </SidebarFoldableSection>
        <SidebarFoldableSection
          title="Priority"
          defaultExpanded={isPriorityExpanded}
        >
          {priorityLinks.map((linkProps) => (
            <SidebarLink key={linkProps.href} {...linkProps} />
          ))}
        </SidebarFoldableSection>
      </div>
    </aside>
  );
};

export default Sidebar;
