import { router, publicProcedure } from "../trpc";
import { z } from "zod";
import { PrismaClient } from "../generated/prisma/client";
import { MAX_INPUT_LENGTH } from "../const";

const prisma = new PrismaClient();

export const projectRouter = router({
  getAll: publicProcedure.query(async () => {
    return await prisma.project.findMany();
  }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(MAX_INPUT_LENGTH),
        description: z.string().optional(),
        startDate: z.coerce.date().optional(),
        endDate: z.coerce.date().optional(),
      }),
    )
    .mutation(async (opts) => {
      const { input: data } = opts;
      const newProject = await prisma.project.create({ data });
      return newProject;
    }),
});
