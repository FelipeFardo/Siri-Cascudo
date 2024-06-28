import { defineAbilityFor } from '@siricascudo/permissions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { serverClient } from '@/lib/trpc/server'

export function isAuthenticated() {
  return !!cookies().get('authjs.session-token')?.value
}

export function getCurrentOrg() {
  return cookies().get('org')?.value ?? null
}

export async function getCurrentMembership() {
  const org = getCurrentOrg()

  if (!org) {
    return null
  }

  const { membership } = await serverClient.getMembership()

  return membership
}

export async function ability() {
  const membership = await getCurrentMembership()

  if (!membership) {
    return null
  }

  const ability = defineAbilityFor({
    id: membership.userId,
    role: membership.role,
  })

  return ability
}

export async function auth() {
  const token = cookies().get('authjs.session-token')

  if (!token) {
    redirect('/auth/sign-in')
  }

  try {
    const { user } = await serverClient.getProfile()
    return {
      user,
    }
  } catch (err) {
    console.log(err)
  }
  redirect('/api/auth/sign-out')
}
