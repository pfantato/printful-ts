import { HttpResponse } from 'msw'

import { STORE_ID_HEADER } from '@printful-ts/constants'
import { InternalId, StringToNumber } from '@printful-ts/schemas'

import { mockErrorResponse } from './generate-error-handlers.util'

export const checkStoreIdHeader = (request: Request) => {
  const { success, data: store_id } = StringToNumber.pipe(InternalId).safeParse(
    request.headers.get(STORE_ID_HEADER),
  )

  if (success) {
    return { success, store_id }
  }

  return {
    success,
    store_id,
    response: HttpResponse.json(...mockErrorResponse(400)),
  }
}
