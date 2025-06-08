"use client";

import type { Task, TaskStatus } from "@/lib/trpc/server-utils";
import { useTRPC } from "@/components/providers/trpc-providers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { taskStatuses } from "@/lib/utils/ui-utils";
import TaskColumn from "@/components/tasks/task-column";

type BoardTabProps = {
  id: string;
  tasks: Task[];
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const BoardTab = ({ id, tasks, setIsModalNewTaskOpen }: BoardTabProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const updateTaskMutation = useMutation(
    trpc.task.update.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.task.getByProject.queryFilter(id));
      },
    }),
  );

  const moveTask = (taskId: string, newStatus: TaskStatus) => {
    updateTaskMutation.mutate({ taskId, data: { status: newStatus } });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid flex-1 grid-cols-1 gap-4 @xl:grid-cols-2 @7xl:grid-cols-4">
        {taskStatuses.map((status) => (
          <TaskColumn
            key={status}
            status={status as TaskStatus}
            tasks={tasks.filter((task) => task.status === status)}
            moveTask={moveTask}
            setIsModalNewTaskOpen={setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default BoardTab;
