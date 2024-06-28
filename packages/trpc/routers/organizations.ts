import { db } from '@siricascudo/prisma'
import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '../trpc'
import { createSlug } from '../utils/create-slug'

export const organizations = createTRPCRouter({
  getOrganizations: protectedProcedure.query(async ({ ctx }) => {
    const {
      session: { user },
    } = ctx
    const userId = user.id

    const organizations = await db.organization.findMany({
      select: {
        id: true,
        name: true,
        slug: true,
        avatarUrl: true,

        members: {
          select: {
            role: true,
          },
          where: {
            userId,
          },
        },
      },
      where: {
        members: {
          some: {
            userId,
          },
        },
      },
    })

    const organizationsWithUserRole = organizations.map(
      ({ members, ...org }) => {
        return {
          ...org,
          role: members[0].role,
        }
      },
    )

    return {
      organizations: organizationsWithUserRole,
    }
  }),

  createOrganizations: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ input, ctx }) => {
      const { name, description } = input
      const userId = ctx.session.user.id!

      const organization = await db.organization.create({
        data: {
          name,
          description,
          slug: createSlug(name),
          ownerId: userId,
          members: {
            create: {
              userId,
              role: 'ADMIN',
            },
          },
        },
      })

      return organization
    }),
})
