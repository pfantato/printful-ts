import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { getWarehouseProductResponseMock } from 'tests/mocks/schemas'
import { generateErrorScenarios } from 'tests/mocks/utils'

export const getWarehouseProductScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.WAREHOUSE_PRODUCTS}/:productId`

  return {
    success: [
      http.get(endpoint, async () =>
        HttpResponse.json(getWarehouseProductResponseMock(), {
          status: 200,
        }),
      ),
    ],
    errors: generateErrorScenarios([401, 404], { endpoint }),
  }
}
