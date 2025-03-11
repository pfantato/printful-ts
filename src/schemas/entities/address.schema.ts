import { z } from 'zod'

export const Address = z.object({
  name: z.string(),
  company: z.string(),
  address1: z.string(),
  address2: z.string(),
  city: z.string(),
  state_code: z.string(),
  state_name: z.string(),
  country_code: z.string(),
  country_name: z.string(),
  zip: z.string(),
  phone: z.string(),
  email: z.string(),
  tax_number: z.string(),
})
export type Address = z.infer<typeof Address>
