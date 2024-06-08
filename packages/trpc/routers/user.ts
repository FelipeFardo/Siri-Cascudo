import { db } from '@siricascudo/prisma'
import { TRPCError } from '@trpc/server'
import { hash } from 'bcrypt'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'

export const userRouter = createTRPCRouter({
  createUser: protectedProcedure
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
})
