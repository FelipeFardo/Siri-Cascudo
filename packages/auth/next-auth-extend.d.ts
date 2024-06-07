import type { AdapterUser as AdapterUserBase } from '@auth/core/adapters'
import type { DefaultSession, User as DefaultUser } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'

declare module '@auth/core/adapters' {
  // eslint-disable-next-line prettier/prettier
  export interface AdapterUser extends AdapterUserBase { }
}

declare module 'next-auth' {
  // eslint-disable-next-line prettier/prettier
  interface User extends DefaultUser { }

  export interface Session extends DefaultSession {
    user: User
  }
}

declare module 'next-auth/jwt' {
  // eslint-disable-next-line prettier/prettier
  interface JWT extends DefaultJWT { }
}
