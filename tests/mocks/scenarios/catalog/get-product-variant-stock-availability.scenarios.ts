import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { GetVariantStockAvailabilitySearchParams } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { getVariantStockAvailabilityResponseMock } from 'tests/mocks/schemas'
import {
  generateErrorScenarios,
  getSearchParams,
  validateRequestSchema,
} from 'tests/mocks/utils'

export const getProductVariantStockAvailabilityScenarios = (
  baseUrl = BASE_URL,
) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_VARIANTS}/:variant_id/availability`

  return {
    success: [
      http.get(endpoint, ({ request, params }) => {
        const searchParams = getSearchParams(request)

        const { success, response: errorResponse } = validateRequestSchema(
          GetVariantStockAvailabilitySearchParams,
          searchParams,
        )

        const { variant_id } = Object.assign({}, params)

        if (!success || !variant_id) {
          return errorResponse
        }

        return HttpResponse.json(getVariantStockAvailabilityResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([400, 401], { endpoint }),
  }
}
