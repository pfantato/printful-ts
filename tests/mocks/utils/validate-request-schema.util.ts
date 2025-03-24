import { HttpResponse } from 'msw'
import type { z } from 'zod'

import { mockErrorResponse } from 'tests/mocks/utils'

type SchemaValidation<T extends z.ZodTypeAny> = {
  data?: z.infer<T>
  response?: HttpResponse
  success: boolean
}

export const validateRequestSchema = <T extends z.ZodTypeAny>(
  schema: T,
  value: unknown,
): SchemaValidation<T> => {
  const { success, data, error } = schema.safeParse(value)

  if (!success) {
    console.error(error.message, error)
    return {
      success,
      response: HttpResponse.json(...mockErrorResponse(400)),
    }
  }

  return { success, data }
}
