import { z } from 'zod'

export const SortDirection = z.enum(['ascending', 'descending'])
export type SortDirection = z.infer<typeof SortDirection>

export const SortType = z.enum(['new', 'rating', 'price', 'bestseller'])
export type SortType = z.infer<typeof SortType>
