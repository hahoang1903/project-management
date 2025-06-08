import { Task, TaskPriority } from "@/lib/trpc/server-utils";
import { format } from "date-fns";
import {
  AlarmClock,
  Clock,
  EllipsisVertical,
  MessageSquareMore,
} from "lucide-react";
import { useDrag } from "react-dnd";
import Avatar from "../avatar";
import { getTaskPriorityColorCls } from "@/lib/utils/ui-utils";

const TaskItem = ({ task }: { task: Task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id, status: task.status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const taskTags = task.tags?.split(",") || [];
  const taskOverDue = !!task.dueDate && new Date(task.dueDate) < new Date();

  const formattedStartDate =
    task.startDate && format(new Date(task.startDate), "P");
  const formattedDueDate = task.dueDate && format(new Date(task.dueDate), "P");

  const renderPriorityTag = (priority: TaskPriority) => (
    <span
      className={`task-tag font-semibold ${getTaskPriorityColorCls(priority)}`}
    >
      {priority}
    </span>
  );

  return (
    <div
      ref={(instance) => {
        drag(instance);
      }}
      className={`dark:bg-dark-secondary mb-4 rounded-md bg-white shadow ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="p-4 @xl:p-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 flex-wrap items-center gap-2">
            {renderPriorityTag(task.priority)}
            <div className="flex gap-2">
              {taskTags.map((tag) => (
                <span key={tag} className="task-tag bg-blue-100">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button className="task-more-btn w-4">
            <EllipsisVertical size={26} />
          </button>
        </div>

        <div className="my-3 flex items-center justify-between">
          <h4
            className="line-clamp-2 text-base font-bold break-words dark:text-white"
            title={task.title}
          >
            {task.title}
          </h4>
          {typeof task.points === "number" && (
            <span className="ml-3 flex-shrink-0 text-xs font-semibold dark:text-white">
              {task.points * 10}%
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 py-2 text-xs">
          <span className="flex items-center gap-1 text-gray-700 dark:text-gray-400">
            <Clock className="size-4" />
            <time>{formattedStartDate}</time>
          </span>
          <span
            className={`flex items-center gap-1 rounded-sm p-1 ${taskOverDue ? "bg-red-200 text-red-700" : "bg-green-200"}`}
          >
            <AlarmClock className="size-4" />
            <time>{formattedDueDate}</time>
          </span>
        </div>

        <p className="task-body-text">
          {task.description || "No description provided."}
        </p>
        <div className="dark:border-stroke-dark mt-4 border-t border-gray-200" />

        <div className="mt-3 flex items-center justify-between">
          <div className="flex -space-x-[6px] overflow-hidden">
            {task.assignee && (
              <Avatar
                key={task.assignee.userId}
                src={task.assignee.profilePictureUrl}
                username={task.assignee.username}
                size={30}
              />
            )}
            {task.author && (
              <Avatar
                key={task.author.userId}
                src={task.author.profilePictureUrl}
                username={task.author.username}
                size={30}
              />
            )}
          </div>
          <div className="task-body-text flex items-center">
            <MessageSquareMore className="size-5" />
            <span className="ml-1">{task.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
