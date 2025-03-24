import { z } from 'zod'

const StringOrNumber = z.string().or(z.number())
export const NumberToString = z
  .number()
  .or(z.string())
  .transform(val => StringOrNumber.pipe(z.coerce.string()).parse(val))

export const StringToNumber = z
  .number()
  .or(z.string())
  .transform(val => StringOrNumber.pipe(z.coerce.number()).parse(val))
