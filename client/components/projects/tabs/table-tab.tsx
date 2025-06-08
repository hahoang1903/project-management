import type { Task } from "@/lib/trpc/server-utils";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useAppSelector } from "@/lib/redux/store";
import {
  getDataGridStyles,
  getTaskPriorityColorCls,
  getTaskStatusColorCls,
  getTaskStatusLabel,
} from "@/lib/utils/ui-utils";
import Header from "@/components/layout/header";
import { format } from "date-fns";
import SpanWithTooltip from "@/components/span-with-tooltip";
import { selectIsDarkMode } from "@/lib/redux/selector";

type TableTabProps = {
  tasks: Task[];
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    width: 350,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <SpanWithTooltip
        className={`task-tag normal-case ${getTaskStatusColorCls(params.value)}`}
        value={getTaskStatusLabel(params.value)}
      />
    ),
  },
  {
    field: "priority",
    headerName: "Priority",
    width: 75,
    renderCell: (params) => (
      <SpanWithTooltip
        className={`task-tag ${getTaskPriorityColorCls(params.value)}`}
        value={params.value}
      />
    ),
  },
  {
    field: "tags",
    headerName: "Tags",
    width: 130,
  },
  {
    field: "startDate",
    headerName: "Start Date",
    width: 150,
    renderCell: (params) => (
      <SpanWithTooltip
        value={
          params.value && format(new Date(params.value), "MM/dd/yyyy hh:mm a")
        }
      />
    ),
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    width: 150,
    renderCell: (params) => (
      <SpanWithTooltip
        value={
          params.value && format(new Date(params.value), "MM/dd/yyyy hh:mm a")
        }
      />
    ),
  },
  {
    field: "author",
    headerName: "Author",
    width: 120,
    renderCell: (params) => <SpanWithTooltip value={params.value.username} />,
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 120,
    renderCell: (params) => (
      <SpanWithTooltip value={params.value.username || "Unassigned"} />
    ),
  },
];

const TableTab = ({ tasks, setIsModalNewTaskOpen }: TableTabProps) => {
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const openModal = () => setIsModalNewTaskOpen(true);

  return (
    <div className="h-[540px] w-full">
      <div className="py-5">
        <Header
          name="Tasks Table"
          isSmallText
          controlComponent={
            <button className="primary-btn" onClick={openModal}>
              Add Task
            </button>
          }
        />
      </div>
      <DataGrid
        rows={tasks}
        columns={columns}
        className="task-table"
        sx={getDataGridStyles(isDarkMode)}
      />
    </div>
  );
};

export default TableTab;
