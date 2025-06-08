import { setActiveTab, type Tab } from "@/lib/redux/ui-state";
import {
  ChartGantt,
  FilterIcon,
  Grid3X3,
  Share2,
  Table,
  type LucideIcon,
} from "lucide-react";
import Header from "../layout/header";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { selectProjectsStatus, selectProjectById } from "@/lib/redux/selector";
import { notFound } from "next/navigation";
import ProjectTitleSkeleton from "../skeleton/project-title-skeleton";

const ProjectHeader = ({ id }: { id: string }) => {
  const project = useAppSelector((state) => selectProjectById(state, id));
  const status = useAppSelector(selectProjectsStatus);

  if (!project && status === "success") return notFound();

  return (
    <div className="flex-shrink-0">
      <div className="pt-6 pb-6 @2xl:pt-8 @2xl:pb-8">
        {status === "pending" ? (
          <ProjectTitleSkeleton />
        ) : (
          <>
            <Header name={project?.name ?? "Project Management"} />
            <p className="py-2 text-sm text-neutral-500 @2xl:text-base dark:text-neutral-400">
              {project?.description}
            </p>
          </>
        )}
      </div>

      <div className="project-tab">
        <div className="flex flex-1 items-center gap-2">
          <TabButton name="board" icon={Grid3X3} />
          <TabButton name="gantt" icon={ChartGantt} />
          <TabButton name="table" icon={Table} />
        </div>
        <div className="ml-4 flex items-center gap-2">
          <button className="project-header-btn">
            <FilterIcon className="size-5" />
          </button>
          <button className="project-header-btn">
            <Share2 className="size-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks"
              className="project-header-search"
            />
            <Grid3X3 className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

type TabButtonProps = {
  name: Tab;
  icon: LucideIcon;
};

const TabButton = ({ name, icon: Icon }: TabButtonProps) => {
  const activeTab = useAppSelector((state) => state.ui.activeTab);
  const dispatch = useAppDispatch();
  const isActive = activeTab === name;

  const onClick = () => dispatch(setActiveTab(name));

  return (
    <button
      className={`project-tab-btn ${
        isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""
      }`}
      onClick={onClick}
    >
      <Icon className="size-5 @2xl:size-6" />
      <span className="capitalize">{name}</span>
    </button>
  );
};

export default ProjectHeader;
