import { z } from 'zod'

export const Store = z.object({
  id: z.number(),
  type: z.string(),
  name: z.string(),
})
export type Store = z.infer<typeof Store>
