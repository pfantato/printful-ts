import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { getProductVariantResponseMock } from 'tests/mocks/schemas'
import { generateErrorScenarios, mockErrorResponse } from 'tests/mocks/utils'

export const getProductVariantScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_VARIANTS}/:variant_id`

  return {
    success: [
      http.get(endpoint, ({ params }) => {
        const { variant_id } = Object.assign({}, params)

        if (!variant_id) {
          return HttpResponse.json(...mockErrorResponse(400))
        }

        return HttpResponse.json(getProductVariantResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([401, 404], { endpoint }),
  }
}
