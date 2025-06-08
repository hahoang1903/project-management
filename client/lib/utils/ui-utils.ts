import type { TaskPriority, TaskStatus } from "../trpc/server-utils";

const taskStatusesMap: Record<
  TaskStatus,
  { label: string; colorCls: string; titleColorCls: string }
> = {
  TODO: {
    label: "To Do",
    titleColorCls: "bg-gray-600",
    colorCls: "bg-gray-200 text-gray-800",
  },
  INPROGRESS: {
    label: "Work In Progress",
    titleColorCls: "bg-purple-500",
    colorCls: "bg-purple-100 text-purple-800",
  },
  REVIEW: {
    label: "Under Review",
    titleColorCls: "bg-yellow-400",
    colorCls: "bg-yellow-100 text-yellow-800",
  },
  COMPLETED: {
    label: "Completed",
    titleColorCls: "bg-green-500",
    colorCls: "bg-green-100 text-green-800",
  },
};

const taskPriorityColorCls: Record<TaskPriority, string> = {
  LOW: "bg-gray-200 text-gray-700",
  MEDIUM: "bg-blue-200 text-blue-700",
  HIGH: "bg-yellow-200 text-yellow-700",
  URGENT: "bg-red-200 text-red-700",
};

export const taskStatuses = Object.keys(taskStatusesMap);
export const getTaskStatusLabel = (status: TaskStatus) => {
  return taskStatusesMap[status].label;
};
export const getTaskStatusColorCls = (status: TaskStatus) => {
  return taskStatusesMap[status].colorCls;
};
export const getTaskStatusTitleColorCls = (status: TaskStatus) => {
  return taskStatusesMap[status].titleColorCls;
};
export const getTaskPriorityColorCls = (priority: TaskPriority) => {
  return taskPriorityColorCls[priority];
};

export const getDataGridStyles = (isDarkMode: boolean) => {
  return {
    "& .MuiDataGrid-columnHeaders": {
      color: `${isDarkMode ? "var(--color-gray-200)" : ""}`,
    },
    '& [role="row"] > *': {
      color: `${isDarkMode ? "var(--color-gray-200)" : ""}`,
      backgroundColor: `${isDarkMode ? "var(--color-dark-secondary)" : "white"}`,
    },
    "& .MuiTablePagination-root": {
      color: `${isDarkMode ? "var(--color-neutral-400)" : ""}`,
      backgroundColor: `${isDarkMode ? "var(--color-dark-secondary)" : "white"}`,
    },
    "& .Mui-disabled": {
      "& .MuiSvgIcon-root": {
        color: `${isDarkMode ? "var(--color-neutral-600)" : ""}`,
      },
    },
    "& .MuiSvgIcon-root": {
      color: `${isDarkMode ? "var(--color-neutral-400)" : ""}`,
    },
    "&.MuiDataGrid-withBorderColor": {
      borderColor: `${isDarkMode ? "var(--color-stroke-dark)" : "var(--color-gray-200)"}`,
    },
    "& .MuiDataGrid-filler": {
      backgroundColor: `${isDarkMode ? "var(--color-dark-secondary)" : "white"}`,
    },
  };
};
