import { z } from 'zod'

export const Address = z
  .object({
    name: z.string().optional(),
    company: z.string().optional(),
    address1: z.string(),
    address2: z.string().optional(),
    city: z.string(),
    state_code: z.string(),
    state_name: z.string().optional(),
    country_code: z.string(),
    country_name: z.string().optional(),
    zip: z.string(),
    phone: z.string().optional(),
    email: z.string().optional(),
    tax_number: z.string().optional(),
  })
  .required({
    address1: true,
    city: true,
    country_code: true,
    zip: true,
  })
export type Address = z.infer<typeof Address>
