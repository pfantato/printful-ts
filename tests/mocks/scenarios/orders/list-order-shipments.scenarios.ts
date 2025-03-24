import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { ListOrderShipmentsSearchParams } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { listOrderShipmentsResponseMock } from 'tests/mocks/schemas'
import {
  checkStoreIdHeader,
  generateErrorScenarios,
  getSearchParams,
  validateRequestSchema,
} from 'tests/mocks/utils'

export const listOrderShipmentsScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDERS}/:orderId/shipments`

  return {
    success: [
      http.get(endpoint, ({ request }) => {
        const { success: hasValidStoreId, response: invalidStoreIdResponse } =
          checkStoreIdHeader(request)

        if (!hasValidStoreId) {
          return invalidStoreIdResponse
        }

        const searchParams = getSearchParams(request)

        const { success: hasValidParams, response: invalidParamsResponse } =
          validateRequestSchema(ListOrderShipmentsSearchParams, searchParams)

        if (!hasValidParams) {
          return invalidParamsResponse
        }

        return HttpResponse.json(listOrderShipmentsResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([401, 500], {
      endpoint,
    }),
  }
}
