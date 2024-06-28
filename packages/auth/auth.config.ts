import type { NextAuthConfig, Session } from 'next-auth'

import { credentialsProvider } from './credentials-provider'
import { googleProvider } from './google-provider'
import { prismaAuthAdapter } from './prisma-auth-adapter'

export const authConfig = {
  adapter: prismaAuthAdapter,
  providers: [googleProvider, credentialsProvider],
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ account }) {
      if (account?.provider === 'google') {
        return true
      } else if (account?.provider === 'credentials') {
        return true
      }

      return false
    },
    jwt({ token, user, session, trigger }) {
      if (user) {
        token.orgSlug = user.orgSlug
        token.restaurantSlug = user.restaurantSlug
      }
      function isSessionAvailable(session: unknown): session is Session {
        return !!session
      }

      if (trigger === 'update' && isSessionAvailable(session)) {
        token.name = session.user.name
      }

      return token
    },
    async session(tudo) {
      const { session, ...params } = tudo
      if ('token' in params && session.user) {
        session.user.id = params.token.sub!
        session.user.orgSlug = params.token.orgSlug
        session.user.restaurantSlug = params.token.restaurantSlug
      }
      return session
    },
  },
} satisfies NextAuthConfig
