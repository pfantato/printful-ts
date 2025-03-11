import { z } from 'zod'

import { Order } from '@printful-ts/schemas/entities'

export const OrderResponse = z.object({
  data: Order,
})
export type OrderResponse = z.infer<typeof OrderResponse>
