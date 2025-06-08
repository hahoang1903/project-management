"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type SidebarLinkProps = {
  href: string;
  icon: LucideIcon;
  label: string;
};

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link href={href} className="w-full">
      <div className={`sidebar-link ${isActive ? "sidebar-link--active" : ""}`}>
        {isActive && (
          <div className="absolute top-0 left-0 h-full w-[5px] bg-blue-200" />
        )}

        <Icon className="sidebar-link__text size-6 min-w-6" />
        <span className="sidebar-link__text font-medium">{label}</span>
      </div>
    </Link>
  );
};

export default SidebarLink;
