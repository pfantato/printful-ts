import { http, HttpResponse } from 'msw'

import { BASE_URL } from 'tests/mocks/constants'
import { listProductVariantsResponseMock } from 'tests/mocks/schemas'
import { generateErrorScenarios } from 'tests/mocks/utils'
import { PrintfulApiResources } from '@printful-ts/constants'

export const listProductVariantsScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_PRODUCTS}/:product_id/${PrintfulApiResources.CATALOG_VARIANTS}`

  return {
    success: [
      http.get(endpoint, () =>
        HttpResponse.json(listProductVariantsResponseMock(), { status: 200 }),
      ),
    ],
    errors: generateErrorScenarios([401], { endpoint }),
  }
}
