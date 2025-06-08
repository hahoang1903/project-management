import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/components/providers/trpc-providers";
import BoardTab from "./board-tab";
import GanttTab from "./gantt-tab";
import TableTab from "./table-tab";
import { useAppSelector } from "@/lib/redux/store";

type ProjectTabsProps = {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const ProjectTabs = ({ id, setIsModalNewTaskOpen }: ProjectTabsProps) => {
  const activeTab = useAppSelector((state) => state.ui.activeTab);

  const trpc = useTRPC();
  const { data: tasks } = useSuspenseQuery(
    trpc.task.getByProject.queryOptions(id),
  );

  const tabProps = { id, tasks, setIsModalNewTaskOpen };

  return (
    <>
      {activeTab === "board" && <BoardTab {...tabProps} />}
      {activeTab === "gantt" && <GanttTab {...tabProps} />}
      {activeTab === "table" && <TableTab {...tabProps} />}
    </>
  );
};

export default ProjectTabs;
