import { expect } from 'vitest'
import { fromError } from 'zod-validation-error'

import type { z } from 'zod'

type SchemaValidation<T extends z.ZodTypeAny> = {
  success: boolean
  data: z.infer<T>
  error: z.ZodError
}
export const validateSchema = <T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
): SchemaValidation<T> => {
  const { success, data: validatedSchema, error } = schema.safeParse(data)

  if (!success) {
    console.error(
      `${fromError(error).toString()} | `,
      JSON.stringify(data, null, 2),
    )
  }
  expect(success).toBe(true)

  return { success, data: validatedSchema, error }
}
