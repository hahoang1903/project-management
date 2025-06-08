import type { LucideIcon } from "lucide-react";

type SidebarLinkSkeletonProps = {
  icon: LucideIcon;
};

const SidebarLinkSkeleton = ({ icon: Icon }: SidebarLinkSkeletonProps) => {
  return (
    <div className="sidebar-link animate-pulse cursor-default">
      <Icon className="sidebar-link__text size-6" />
      <div className="skeleton size-full" />
    </div>
  );
};

export default SidebarLinkSkeleton;
