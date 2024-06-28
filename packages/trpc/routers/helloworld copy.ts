import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const helloWorldProtect = createTRPCRouter({
  helloWorldProtect: protectedProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      console.log(ctx)
      return {
        message: `Hello ${input}`,
      }
    }),
})
