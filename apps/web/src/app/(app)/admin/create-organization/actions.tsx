'use server'

import { z } from 'zod'

import { serverClient } from '@/lib/trpc/server'

const createOrganizationSchema = z.object({
  name: z.string().min(4, { message: 'Plase include at least 4 characteres.' }),
  description: z
    .string()
    .min(4, { message: 'Plase include at least 4 characteres.' }),
})

export async function createOrganizationAction(data: FormData) {
  const result = createOrganizationSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { name, description } = result.data

  try {
    await serverClient.createOrganizations({
      name,
      description,
    })
  } catch (err) {
    console.log(err)
    return {
      success: false,
      message: 'Unexpected error, try again in a few minutes.',
      errors: null,
    }
  }

  return {
    success: true,
    message: 'Successfully saved the organization.',
    errors: null,
  }
}
