import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { userRouter } from './routers/user'
import { createCallerFactory, mergeRouters } from './trpc'

export const appRouter = mergeRouters(userRouter)

export { createCallerFactory }

export type AppRouter = typeof appRouter
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
