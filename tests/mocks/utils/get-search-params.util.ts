import type { AnyZodObject, z } from 'zod'
import { fromError } from 'zod-validation-error'

export const getSearchParams = <T extends AnyZodObject>(
  request: Request,
  schema?: T,
): { searchParams: z.infer<T>; success: boolean } => {
  const rawParams = new URL(request.url).searchParams
  const params = Object.entries(rawParams).filter(
    ([, value]) =>
      value !== undefined &&
      value !== null &&
      value !== 'undefined' &&
      value !== 'null',
  )
  const searchParams = Object.assign({}, Object.fromEntries(params))

  if (!schema) {
    return { searchParams, success: true }
  }

  const { success, data, error } = schema.safeParse(searchParams)
  if (!success) {
    console.error(fromError(error).toString())
    return { searchParams, success }
  }

  return { searchParams: data, success }
}