import { http, HttpResponse } from 'msw'

import { BASE_URL } from 'tests/mocks/constants'
import { listProductCategoriesResponseMock } from 'tests/mocks/schemas'
import {
  generateErrorScenarios,
  getSearchParams,
  mockErrorResponse,
} from 'tests/mocks/utils'
import { PrintfulApiResources } from '@printful-ts/constants'
import { ListProductCategoriesSearchParams } from '@printful-ts/schemas'

export const listProductCategoriesScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_PRODUCTS}/:product_id/${PrintfulApiResources.CATALOG_CATEGORIES}`

  return {
    success: [
      http.get(endpoint, ({ request }) => {
        const { success } = getSearchParams(
          request,
          ListProductCategoriesSearchParams,
        )

        if (!success) {
          return HttpResponse.json(...mockErrorResponse(400))
        }

        return HttpResponse.json(listProductCategoriesResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([400, 401, 404], { endpoint }),
  }
}
