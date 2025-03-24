import { http, HttpResponse } from 'msw'

import { GetProductSearchInput } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { getProductResponseMock } from 'tests/mocks/schemas'
import {
  generateErrorScenarios,
  getSearchParams,
  validateRequestSchema,
} from 'tests/mocks/utils'
import { PrintfulApiResources } from '@printful-ts/constants'

export const getProductScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_PRODUCTS}/:product_id`

  return {
    success: [
      http.get(endpoint, ({ request, params }) => {
        const searchParams = getSearchParams(request)

        const { success, response: errorResponse } = validateRequestSchema(
          GetProductSearchInput,
          searchParams,
        )

        const { product_id } = Object.assign({}, params)

        if (!success || !product_id) {
          return errorResponse
        }

        return HttpResponse.json(getProductResponseMock(), { status: 200 })
      }),
    ],
    errors: generateErrorScenarios([400, 401], { endpoint }),
  }
}
