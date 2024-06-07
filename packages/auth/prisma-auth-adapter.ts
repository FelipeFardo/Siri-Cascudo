import { Adapter } from '@auth/core/adapters'
import { db } from '@siricascudo/prisma'

export const prismaAuthAdapter: Adapter = {
  async createUser(userToCreate) {
    const prismaUser = await db.user.create({
      data: {
        email: userToCreate.email,
        name: userToCreate.name,
        avatarUrl: userToCreate.image,
        emailVerified: userToCreate.emailVerified,
      },
    })

    return prismaUser
  },

  async getUser(id) {
    const authUser = await db.user.findUnique({
      where: {
        id,
      },
    })

    return authUser
  },

  async getUserByEmail(email) {
    const authUser = await db.user.findUnique({
      where: {
        email,
      },
    })

    return authUser
  },

  async getUserByAccount({ providerAccountId, provider }) {
    const authUser = await db.user.findFirst({
      where: {
        accounts: {
          some: {
            provider,
            providerAccountId,
          },
        },
      },
    })
    return authUser
  },
  async updateUser({ id, ...userToUpdate }) {
    const prismaUser = await db.user.update({
      where: {
        id,
      },
      data: {
        name: userToUpdate.name,
        email: userToUpdate.email,
        emailVerified: userToUpdate.emailVerified,
        avatarUrl: userToUpdate.image,
      },
    })

    return prismaUser
  },

  async linkAccount(accountToCreate) {
    await db.account.create({
      data: {
        provider: accountToCreate.provider,
        providerAccountId: accountToCreate.providerAccountId,
        userId: accountToCreate.userId,
      },
    })
  },

  async getSessionAndUser(sessionToken) {
    const prismaSession = await db.session.findFirst({
      include: {
        user: true,
      },
      where: {
        sessionToken,
      },
    })

    if (!prismaSession) {
      return null
    }

    const { user, ...session } = prismaSession
    return {
      user,
      session,
    }
  },

  async updateSession({ sessionToken, ...sessionToUpdate }) {
    const prismaSession = await db.session.update({
      where: {
        sessionToken,
      },
      data: {
        userId: sessionToUpdate.userId,
        expires: sessionToUpdate.expires,
      },
    })
    return prismaSession
  },

  async deleteSession(sessionToken) {
    await db.session.delete({
      where: {
        sessionToken,
      },
    })
  },
}
