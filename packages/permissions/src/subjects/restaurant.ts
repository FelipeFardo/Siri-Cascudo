import { z } from 'zod'

import { restaurantSchema } from '../models/restaurant'

export const restaurantSubject = z.tuple([
  z.union([
    z.literal('manage'),
    z.literal('get'),
    z.literal('create'),
    z.literal('update'),
    z.literal('delete'),
  ]),
  z.union([z.literal('Restaurant'), restaurantSchema]),
])

export type RestaurantSubject = z.infer<typeof restaurantSubject>
