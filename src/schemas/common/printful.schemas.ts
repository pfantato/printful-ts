import { z } from 'zod'

export const PrintfulVersion = z.enum(['v1', 'v2'])
export type PrintfulVersion = z.infer<typeof PrintfulVersion>

export const PrintfulConfig = z.object({
  privateToken: z.string(),
  baseUrl: z.string().url().optional().default('https://api.printful.com'),
  version: PrintfulVersion.optional().default(PrintfulVersion.enum.v2),
})
export type PrintfulConfig = z.infer<typeof PrintfulConfig>
