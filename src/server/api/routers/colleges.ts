import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const collegesRouter = createTRPCRouter({
  getInfo: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(({ ctx, input }) => {
      return ctx.db.general.findFirst({
        where: { UNITID: input.id },
      });
    }),
  getCollegesLike: protectedProcedure
    .input(z.object({ name: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.general.findMany({
        where: { INSTNM: { contains: input.name } },
        select: { UNITID: true, INSTNM: true },
      });
    }),
});
