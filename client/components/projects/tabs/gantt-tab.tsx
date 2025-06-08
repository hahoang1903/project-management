import type { Task } from "@/lib/trpc/server-utils";
import {
  Gantt,
  ViewMode,
  type DisplayOption,
  type Task as GanttTask,
} from "gantt-task-react";
import { useAppSelector } from "@/lib/redux/store";
import { useState } from "react";

import "gantt-task-react/dist/index.css";
import Header from "@/components/layout/header";

type GanttTabProps = {
  tasks: Task[];
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const GanttTab = ({ tasks, setIsModalNewTaskOpen }: GanttTabProps) => {
  const isDarkMode = useAppSelector((state) => state.ui.isDarkMode);
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Month,
    locale: "en-US",
  });

  const ganttTasks: GanttTask[] = tasks.map((task) => ({
    start: new Date(task.startDate as string),
    end: new Date(task.dueDate as string),
    name: task.title,
    id: task.id,
    type: "task",
    progress: ((task?.points || 0) / 10) * 100,
    isDisabled: false,
  }));

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setDisplayOptions((prev) => ({
      ...prev,
      viewMode: event.target.value as ViewMode,
    }));
  };

  const openModal = () => setIsModalNewTaskOpen(true);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 py-5">
        <Header
          name="Project Gantt Chart"
          isSmallText
          controlComponent={
            <div className="inline-block w-32 @xl:w-48 @4xl:w-64">
              <select
                className="select"
                value={displayOptions.viewMode}
                onChange={handleViewModeChange}
              >
                <option value={ViewMode.Day}>Day</option>
                <option value={ViewMode.Week}>Week</option>
                <option value={ViewMode.Month}>Month</option>
              </select>
            </div>
          }
        />
      </div>

      <div className="dark:bg-dark-secondary rounded-md bg-white shadow dark:text-white">
        <div className="overflow-x-auto">
          <div className="gantt">
            <Gantt
              tasks={ganttTasks}
              {...displayOptions}
              columnWidth={
                displayOptions.viewMode === ViewMode.Month ? 150 : 100
              }
              barBackgroundColor={
                isDarkMode ? "var(--color-dark-bg)" : "var(--color-gray-300)"
              }
              barBackgroundSelectedColor={
                isDarkMode ? "var(--color-black)" : "var(--color-gray-400)"
              }
              barProgressColor={
                isDarkMode
                  ? "var(--color-purple-400)"
                  : "var(--color-green-400)"
              }
              barProgressSelectedColor={
                isDarkMode
                  ? "var(--color-purple-500)"
                  : "var(--color-green-500)"
              }
            />
          </div>
        </div>

        <div className="px-4 pt-1 pb-5">
          <button className="primary-btn" onClick={openModal}>
            Add New Task
          </button>
        </div>
      </div>
    </>
  );
};

export default GanttTab;
