import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { OrderBody } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { orderResponseMock } from 'tests/mocks/schemas'
import {
  checkStoreIdHeader,
  generateErrorScenarios,
  getRequestBody,
  validateRequestSchema,
} from 'tests/mocks/utils'

export const createOrderScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDERS}`

  return {
    success: [
      http.post(endpoint, async ({ request }) => {
        const body = await getRequestBody<OrderBody>(request)

        const {
          success: hasValidStoreId,
          store_id,
          response: storeIdErrorResponse,
        } = checkStoreIdHeader(request)

        if (!hasValidStoreId) {
          return storeIdErrorResponse
        }

        const { success, response: errorResponse } = validateRequestSchema(
          OrderBody,
          { store_id, ...body },
        )

        if (!success) {
          return errorResponse
        }

        return HttpResponse.json(orderResponseMock(), { status: 200 })
      }),
    ],
    errors: generateErrorScenarios([400], {
      endpoint,
      method: 'post',
    }),
  }
}
