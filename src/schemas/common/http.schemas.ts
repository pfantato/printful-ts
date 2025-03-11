import { z } from 'zod'

export const PrintfulResponseError = z.object({
  type: z.string().url(),
  status: z.number(),
  title: z.string(),
  detail: z.string(),
  instance: z.string().optional(),
})
export type PrintfulResponseError = z.infer<typeof PrintfulResponseError>
