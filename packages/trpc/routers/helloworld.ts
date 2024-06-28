import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '../trpc'

export const helloWorldRoute = createTRPCRouter({
  helloWorld: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    return {
      message: `Hello ${input}`,
    }
  }),
})
