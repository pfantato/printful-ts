import { z } from 'zod'
import { NumberToString, StringToNumber } from '../utils'
export const NonNegativeNumber = z.number().nonnegative()
export type NonNegativeNumber = z.infer<typeof NonNegativeNumber>

export const Limit = NonNegativeNumber.max(100).default(20).catch(20).optional()
export type Limit = z.infer<typeof Limit>

export const Offset = NonNegativeNumber.default(0).catch(0).optional()
export type Offset = z.infer<typeof Offset>

export const FilterSettings = z.object({
  name: z.string(),
  value: z.string(),
})
export type FilterSettings = z.infer<typeof FilterSettings>

export const Paging = z.object({
  total: NonNegativeNumber.optional(),
  offset: Offset.optional(),
  limit: Limit.optional(),
})
export type Paging = z.infer<typeof Paging>

export const PagingSearchInput = z.object({
  limit: Limit.pipe(NumberToString).optional(),
  offset: Offset.pipe(NumberToString).optional(),
})
export type PagingSearchInput = z.input<typeof PagingSearchInput>
export type PagingSearchParams = z.output<typeof PagingSearchInput>
export const PagingSearchParams = z.object({
  limit: StringToNumber.pipe(Limit).optional(),
  offset: StringToNumber.pipe(Offset).optional(),
})
