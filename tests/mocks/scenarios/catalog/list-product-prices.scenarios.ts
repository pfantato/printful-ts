import { http, HttpResponse } from 'msw'

import { BASE_URL } from 'tests/mocks/constants'
import { listProductPricesResponseMock } from 'tests/mocks/schemas'
import {
  generateErrorScenarios,
  getSearchParams,
  mockErrorResponse,
} from 'tests/mocks/utils'
import { PrintfulApiResources } from '@printful-ts/constants'
import { ListProductPricesSearchParams } from '@printful-ts/schemas'

export const listProductPricesScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_PRODUCTS}/:product_id/prices`

  return {
    success: [
      http.get(endpoint, ({ request }) => {
        const { success } = getSearchParams(
          request,
          ListProductPricesSearchParams,
        )
        if (!success) {
          return HttpResponse.json(...mockErrorResponse(400))
        }

        return HttpResponse.json(listProductPricesResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([400, 401, 404], { endpoint }),
  }
}
