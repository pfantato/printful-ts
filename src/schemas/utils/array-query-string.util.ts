import { z, type ZodTypeAny } from 'zod'

export const ArrayToString = <T extends ZodTypeAny>(schema: T) =>
  schema
    .array()
    .transform((values: unknown[]) => values.toLocaleString())
    .pipe(z.coerce.string())

export const StringToArray = z
  .string()
  .transform(value => value.split(','))
  .pipe(z.coerce.string().array())
