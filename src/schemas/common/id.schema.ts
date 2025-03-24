import { z } from 'zod'

export const InternalId = z.coerce.number().nonnegative()
export type InternalId = z.infer<typeof InternalId>

export const ExternalId = z
  .custom<`@${string}`>(val => z.string().safeParse(val).success)
  .pipe(z.coerce.string())
  .refine(val => val.startsWith('@'), "External ID must start with '@'")
export type ExternalId = z.infer<typeof ExternalId>

export const ExternalOrInternalId = z.custom<InternalId | ExternalId>(
  val => InternalId.or(ExternalId).safeParse(val).success,
  {
    message: 'ID should be either `@${string}` or a positive number',
  },
)
export type ExternalOrInternalId = z.infer<typeof ExternalOrInternalId>
