import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { getProductSizeGuideResponseMock } from 'tests/mocks/schemas'
import { generateErrorScenarios } from 'tests/mocks/utils'

export const getProductSizeGuideScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_PRODUCTS}/:product_id/sizes`

  return {
    success: [
      http.get(endpoint, () => {
        const response = getProductSizeGuideResponseMock()
        return HttpResponse.json(response, {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([401, 404], { endpoint }),
  }
}
