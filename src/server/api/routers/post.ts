import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(z.object({ 
      name: z.string().min(1),
      description: z.string().optional(),
      githubUrl: z.string().optional(),
      userId: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.project.create({
        data: {
          name: input.name,
          description: input.description,
          githubUrl: input.githubUrl,
          userId: input.userId,
        },
      });
    }),

  getLatest: publicProcedure.query(async ({ ctx }) => {
    const project = await ctx.db.project.findFirst({
      orderBy: { createdAt: "desc" },
    });

    return project ?? null;
  }),
});
