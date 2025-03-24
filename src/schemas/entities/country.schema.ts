import { z } from 'zod'

export const CountryState = z.object({
  code: z.string(),
  name: z.string(),
})
export type CountryState = z.infer<typeof CountryState>

export const Country = z.object({
  code: z.string(),
  name: z.string(),
  states: CountryState.array(),
})
export type Country = z.infer<typeof Country>
