import { z } from 'zod'

export const Limit = z.number().min(0).max(100).default(20)
export type Limit = z.infer<typeof Limit>

export const Offset = z.number().min(0).default(0)
export type Offset = z.infer<typeof Offset>

export const FilterSettings = z.object({
  name: z.string(),
  value: z.string(),
})
export type FilterSettings = z.infer<typeof FilterSettings>

export const Paging = z.object({
  total: z.number(),
  offset: Offset,
  limit: Limit,
})
export type Paging = z.infer<typeof Paging>
