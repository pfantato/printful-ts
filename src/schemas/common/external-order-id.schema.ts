import { z } from 'zod'

export const ExternalIdParam = z
  .string()
  .regex(/^@.*$/, {
    message: "External Order ID must start with '@'",
  })
  .or(z.number())
export type ExternalIdParam = `@${string}` | number
