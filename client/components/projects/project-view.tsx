"use client";

import { useState } from "react";
import { useAppSelector } from "@/lib/redux/store";
import ProjectHeader from "@/components/projects/project-header";
import ProjectTabs from "./tabs";
import SafeQuerySuspense from "../safe-query-suspense";
import BoardTabSkeleton from "../skeleton/board-tab-skeleton";
import BoardTabError from "../errors/board-tab-error";

const ProjectView = ({ id }: { id: string }) => {
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const activeTab = useAppSelector((state) => state.ui.activeTab);

  return (
    <div className="flex flex-1 flex-col px-4 @6xl:px-6">
      <ProjectHeader id={id} />
      <SafeQuerySuspense
        fallback={
          activeTab === "board" ? (
            <BoardTabSkeleton />
          ) : (
            <div className="skeleton mt-10 h-[450px] rounded-lg" />
          )
        }
        errorFallback={BoardTabError}
      >
        <ProjectTabs id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      </SafeQuerySuspense>
    </div>
  );
};

export default ProjectView;
