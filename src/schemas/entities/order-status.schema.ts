import { z } from 'zod'

export const OrderStatus = z.enum([
  'draft',
  'failed',
  'pending',
  'canceled',
  'onhold',
  'inprocess',
  'partial',
  'fulfilled',
])
export type OrderStatus = z.infer<typeof OrderStatus>
