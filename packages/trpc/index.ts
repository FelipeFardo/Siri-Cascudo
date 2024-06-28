import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'

import { helloWorldRoute } from './routers/helloworld'
import { helloWorldProtect } from './routers/helloworld copy'
import { organizations } from './routers/organizations'
import { userRouter } from './routers/user'
import { createCallerFactory, mergeRouters } from './trpc'

export const appRouter = mergeRouters(
  userRouter,
  helloWorldRoute,
  helloWorldProtect,
  organizations,
)

export { createCallerFactory }

export type AppRouter = typeof appRouter
export type RouterInputs = inferRouterInputs<AppRouter>
export type RouterOutput = inferRouterOutputs<AppRouter>
