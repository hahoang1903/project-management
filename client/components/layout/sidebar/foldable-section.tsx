"use client";

import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

type SidebarFoldableSectionProps = {
  title: string;
  children: React.ReactNode;
};

const SidebarFoldableSection = ({
  title,
  children,
}: SidebarFoldableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <>
      <button
        onClick={toggleExpand}
        className="sidebar-link justify-between text-gray-500 dark:text-gray-400"
      >
        <span>{title}</span>
        <ChevronRight
          className={`size-5 transition-transform ${isExpanded ? "rotate-90" : ""}`}
        />
      </button>

      <div className={`${isExpanded ? "flex flex-col" : "hidden"}`}>
        {children}
      </div>
    </>
  );
};

export default SidebarFoldableSection;
