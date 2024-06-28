import { PrismaClient, Organization, Member } from '@prisma/client'

export const db = new PrismaClient({
  log: ['error'],
})


export type { Organization, Member }