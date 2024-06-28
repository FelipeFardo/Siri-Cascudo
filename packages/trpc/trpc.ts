import { Session } from '@siricascudo/auth'
import { db } from '@siricascudo/prisma'
import { initTRPC, TRPCError } from '@trpc/server'
import SuperJSON from 'superjson'
import { ZodError } from 'zod'
type TRPCContext = {
  session: Session | null
}

const t = initTRPC.context<TRPCContext>().create({
  transformer: SuperJSON,
  errorFormatter({ shape, error }) {
    console.log(error)
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const {
  router: createTRPCRouter,
  procedure: publicProcedure,
  createCallerFactory,
  middleware,
  mergeRouters,
} = t

export const protectedProcedure = publicProcedure.use(({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' })
  }

  return next({
    ctx: {
      session: ctx.session,
    },
  })
})

export const protectedMemberships = protectedProcedure.use(
  async ({ ctx, next }) => {
    if (!ctx.session || !ctx.session.user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' })
    }

    // if (!ctx.session.orgSlug) {
    //   throw new TRPCError({ code: 'UNAUTHORIZED' })
    // }

    const userId = ctx.session.user.id
    const member = await db.member.findFirst({
      where: {
        userId,
        organization: {
          slug: ctx.session.orgSlug,
        },
      },
      include: {
        organization: true,
      },
    })

    if (!member) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      })
    }

    const { organization, ...membership } = member

    return next({
      ctx: {
        session: ctx.session,
        org: organization,
        membership,
      },
    })
  },
)
