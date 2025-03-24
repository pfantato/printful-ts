import { http, HttpResponse } from 'msw'

import { GetProductStockAvailabilitySearchParams } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { getProductStockAvailabilityResponseMock } from 'tests/mocks/schemas'
import {
  generateErrorScenarios,
  getSearchParams,
  validateRequestSchema,
} from 'tests/mocks/utils'
import { PrintfulApiResources } from '@printful-ts/constants'

export const getProductStockAvailabilityScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_PRODUCTS}/:product_id/availability`

  return {
    success: [
      http.get(endpoint, ({ request, params }) => {
        const searchParams = getSearchParams(request)

        const { success, response: errorResponse } = validateRequestSchema(
          GetProductStockAvailabilitySearchParams,
          searchParams,
        )

        const { product_id } = Object.assign({}, params)

        if (!success || !product_id) {
          return errorResponse
        }

        const response = getProductStockAvailabilityResponseMock()

        return HttpResponse.json(response, {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([400, 401], { endpoint }),
  }
}
