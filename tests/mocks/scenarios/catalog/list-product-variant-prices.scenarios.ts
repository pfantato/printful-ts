import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { ListProductVariantPricesSearchParams } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { listProductVariantPricesResponseMock } from 'tests/mocks/schemas'
import {
  generateErrorScenarios,
  getSearchParams,
  mockErrorResponse,
} from 'tests/mocks/utils'

export const listProductVariantPricesScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_VARIANTS}/:variant_id/prices`

  return {
    success: [
      http.get(endpoint, ({ request }) => {
        const { success } = getSearchParams(
          request,
          ListProductVariantPricesSearchParams,
        )
        if (!success) {
          return HttpResponse.json(...mockErrorResponse(400))
        }

        return HttpResponse.json(listProductVariantPricesResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([400, 401, 404], { endpoint }),
  }
}
