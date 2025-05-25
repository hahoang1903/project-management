import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import {
  PrismaClient,
  TaskStatus,
  TaskPriority,
} from "../generated/prisma/client";
import { MAX_INPUT_LENGTH } from "../const";

const prisma = new PrismaClient();

export const taskRouter = router({
  getByProject: publicProcedure.input(z.string().min(1)).query(async (opts) => {
    const { input: projectId } = opts;
    return await prisma.task.findMany({
      where: { projectId },
      include: {
        author: true,
        assignee: true,
        comments: true,
        attachments: true,
      },
    });
  }),
  create: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(MAX_INPUT_LENGTH),
        description: z.string().min(1),
        status: z.nativeEnum(TaskStatus),
        priority: z.nativeEnum(TaskPriority),
        tags: z.string().optional(),
        startDate: z.coerce.date().optional(),
        dueDate: z.coerce.date().optional(),
        points: z.number().optional(),
        projectId: z.string().uuid(),
        authorId: z.string().uuid(),
        assigneeId: z.string().uuid().optional(),
      }),
    )
    .mutation(async (opts) => {
      const { input: data } = opts;
      const newTask = await prisma.task.create({ data });
      return newTask;
    }),
  update: publicProcedure
    .input(
      z.object({
        taskId: z.string().uuid(),
        data: z
          .object({
            title: z.string().min(1).max(MAX_INPUT_LENGTH),
            description: z.string().min(1),
            status: z.nativeEnum(TaskStatus),
            priority: z.nativeEnum(TaskPriority),
            tags: z.string(),
            startDate: z.coerce.date(),
            dueDate: z.coerce.date(),
            points: z.number(),
            projectId: z.string().uuid(),
            authorId: z.string().uuid(),
            assigneeId: z.string().uuid(),
          })
          .partial(),
      }),
    )
    .mutation(async (opts) => {
      const {
        input: { taskId, data },
      } = opts;
      const updatedTask = await prisma.task.update({
        where: { id: taskId },
        data,
      });
      return updatedTask;
    }),
});
