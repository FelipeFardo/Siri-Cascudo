import { roleSchema } from '@siricascudo/permissions'
import { db } from '@siricascudo/prisma'
import { TRPCError } from '@trpc/server'
import { hash } from 'bcryptjs'
import { z } from 'zod'

import {
  createTRPCRouter,
  protectedMemberships,
  protectedProcedure,
  publicProcedure,
} from '../trpc'

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(
      z.object({
        email: z.string(),
        name: z.string(),
        password: z.string(),
        phone: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { email, name, password, phone } = input
      const userByEmail = await db.user.findUnique({
        where: {
          email,
        },
      })

      if (userByEmail) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
        })
      }

      const hashedPassword = await hash(password, 12)

      return await db.user.create({
        data: {
          email,
          name,
          passwordHash: hashedPassword,
          phone,
        },
      })
    }),

  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const { session } = ctx

    const user = await db.user.findUnique({
      where: {
        id: session?.user.id,
      },
    })

    if (!user) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
      })
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
      },
    }
  }),
  getMembership: protectedMemberships.query(async ({ ctx }) => {
    const { membership } = ctx

    return {
      membership: {
        id: membership.id,
        role: roleSchema.parse(membership.role),
        organizationId: membership.organizationId,
        userId: membership.userId,
      },
    }
  }),
})
