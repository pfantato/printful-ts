import { http, HttpResponse } from 'msw'

import { Limit, ListProductsSearchParams, Offset } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { listProductsResponseMock } from 'tests/mocks/schemas'
import {
  generateErrorScenarios,
  getSearchParams,
  mockErrorResponse,
} from 'tests/mocks/utils'
import { PrintfulApiResources } from '@printful-ts/constants'

export const listProductsScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_PRODUCTS}`

  return {
    success: [
      http.get(endpoint, ({ request }) => {
        const { success, searchParams } = getSearchParams(
          request,
          ListProductsSearchParams,
        )

        if (!success) {
          return HttpResponse.json(...mockErrorResponse(400))
        }

        return HttpResponse.json(
          listProductsResponseMock(undefined, {
            limit: Limit.parse(searchParams.limit),
            offset: Offset.parse(searchParams.offset),
          }),
          { status: 200 },
        )
      }),
    ],
    errors: generateErrorScenarios([400, 401], { endpoint }),
  }
}
