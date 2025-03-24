import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { GetProductMockupsSearchParams } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { getProductMockupTemplatesResponseMock } from 'tests/mocks/schemas'
import {
  generateErrorScenarios,
  getSearchParams,
  validateRequestSchema,
} from 'tests/mocks/utils'

export const getProductMockupTemplatesScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_PRODUCTS}/:product_id/mockup-templates`

  return {
    success: [
      http.get(endpoint, ({ request, params }) => {
        const searchParams = getSearchParams(request)

        const { success, response: errorResponse } = validateRequestSchema(
          GetProductMockupsSearchParams,
          searchParams,
        )

        const { product_id } = Object.assign({}, params)

        if (!success || !product_id) {
          return errorResponse
        }

        return HttpResponse.json(getProductMockupTemplatesResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([400, 401], { endpoint }),
  }
}
