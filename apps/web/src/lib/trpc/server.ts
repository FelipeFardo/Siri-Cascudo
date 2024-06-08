import 'server-only'

import { auth } from '@siricascudo/auth'
import { appRouter, createCallerFactory } from '@siricascudo/trpc'

export const serverClient = createCallerFactory(appRouter)(async () => {
  const session = await auth()

  return { session }
})