import { router } from "../trpc";
import { projectRouter } from "./project";
import { taskRouter } from "./task";

export const appRouter = router({
  project: projectRouter,
  task: taskRouter,
});

export type AppRouter = typeof appRouter;
