import { EllipsisVertical, Plus } from "lucide-react";
import { Task, TaskStatus } from "@/lib/trpc/server-utils";
import { useDrop } from "react-dnd";
import {
  getTaskStatusTitleColorCls,
  getTaskStatusLabel,
} from "@/lib/utils/ui-utils";
import TaskItem from "./task-item";

type TaskColumnProps = {
  status: TaskStatus;
  tasks: Task[];
  moveTask: (taskId: string, newStatus: TaskStatus) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const TaskColumn = ({
  status,
  tasks,
  moveTask,
  setIsModalNewTaskOpen,
}: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: string; status: TaskStatus }) => {
      if (item.status === status) return;
      moveTask(item.id, status as TaskStatus);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const openNewTaskModal = () => {
    setIsModalNewTaskOpen(true);
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`rounded-lg py-4 @6xl:py-6 ${isOver ? "bg-blue-100 dark:bg-neutral-950" : ""}`}
    >
      <div className="mb-3 flex w-full">
        <div
          className={`w-2 ${getTaskStatusTitleColorCls(status)} rounded-s-lg`}
        />
        <div className="dark:bg-dark-secondary flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4">
          <h3 className="flex items-center text-lg font-semibold dark:text-white">
            {getTaskStatusLabel(status)}
            <span className="dark:bg-dark-tertiary ml-2 inline-block size-[1.5rem] rounded-full bg-gray-200 p-1 text-center text-sm leading-none">
              {tasks.length}
            </span>
          </h3>
          <div className="flex items-center gap-1">
            <button className="task-more-btn w-5">
              <EllipsisVertical size={26} />
            </button>
            <button
              className="dark:bg-dark-tertiary flex size-6 items-center justify-center rounded bg-gray-200 hover:bg-gray-300 dark:text-white dark:hover:bg-gray-600"
              onClick={openNewTaskModal}
            >
              <Plus className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskColumn;
