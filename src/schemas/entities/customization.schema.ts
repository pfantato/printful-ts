import { z } from 'zod'

export const Gift = z.object({
  subject: z.string(),
  message: z.string(),
})
export type Gift = z.infer<typeof Gift>

export const PackingSlip = z.object({
  email: z.string().email(),
  phone: z.string(),
  message: z.string(),
  logo_url: z.string().url(),
  store_name: z.string(),
  custom_order_id: z.string(),
})
export type PackingSlip = z.infer<typeof PackingSlip>

export const Customization = z.object({
  gift: Gift,
  packing_slip: PackingSlip,
})
export type Customization = z.infer<typeof Customization>
