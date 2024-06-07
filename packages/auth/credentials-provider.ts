import { db } from '@siricascudo/prisma'
import { compare } from 'bcrypt'
import CredentialsProvider from 'next-auth/providers/credentials'

export const credentialsProvider = CredentialsProvider({
  credentials: {
    email: {
      label: 'E-mail',
      type: 'email',
      placeholder: 'use admin@rocketseat.team',
      value: 'admin@rocketseat.team',
    },
    password: {
      label: 'Password',
      type: 'password',
      value: 'admin',
      placeholder: 'use 123456',
    },
  },
  async authorize(credentials) {
    if (
      credentials &&
      typeof credentials.email === 'string' &&
      typeof credentials.password === 'string'
    ) {
      const user = await db.user.findUnique({
        where: {
          email: credentials.email,
        },
      })

      if (!user || !user.passwordHash) {
        throw new Error('Unauthorized.')
      }

      const isCorrectPassword = await compare(
        credentials.password,
        user.passwordHash,
      )

      if (!isCorrectPassword) {
        throw new Error('Unauthorized.')
      }

      return user
    }

    throw new Error('Unauthorized.')
  },
})
