import type { AdapterUser as AdapterUserBase } from '@auth/core/adapters'
import type { DefaultSession, User as DefaultUser } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'

declare module '@auth/core/adapters' {
  export interface AdapterUser extends AdapterUserBase {
    orgSlug: string | null
    restaurantSlug: string | null
  }
}

declare module 'next-auth' {
  interface User extends DefaultUser {
    orgSlug: string | null
    restaurantSlug: string | null
  }

  export interface Session extends DefaultSession {
    user: User
    orgSlug: string | null
    restaurantSlug: string | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    orgSlug: string | null
    restaurantSlug: string | null
  }
}
