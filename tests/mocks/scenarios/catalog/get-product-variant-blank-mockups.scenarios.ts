import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { GetVariantBlankMockupsSearchParams } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import {
  generateErrorScenarios,
  getSearchParams,
  validateRequestSchema,
} from 'tests/mocks/utils'
import { getVariantBlankMockupsResponseMock } from 'tests/mocks/schemas'

export const getProductVariantBlankMockupsScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_VARIANTS}/:variant_id/images`

  return {
    success: [
      http.get(endpoint, ({ request, params }) => {
        const searchParams = getSearchParams(request)

        const { success, response: errorResponse } = validateRequestSchema(
          GetVariantBlankMockupsSearchParams,
          searchParams,
        )

        const { variant_id } = Object.assign({}, params)

        if (!success || !variant_id) {
          return errorResponse
        }

        return HttpResponse.json(getVariantBlankMockupsResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([400, 401], { endpoint }),
  }
}
