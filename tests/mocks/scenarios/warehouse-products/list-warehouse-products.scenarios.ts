import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { ListWarehouseProductsSearchParams } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { listWarehouseProductsResponseMock } from 'tests/mocks/schemas'
import {
  generateErrorScenarios,
  validateRequestSchema,
} from 'tests/mocks/utils'

export const listWarehouseProductsScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.WAREHOUSE_PRODUCTS}`

  return {
    success: [
      http.get(endpoint, async ({ params }) => {
        const { success, response: errorResponse } = validateRequestSchema(
          ListWarehouseProductsSearchParams,
          params,
        )

        if (!success) {
          return errorResponse
        }

        return HttpResponse.json(listWarehouseProductsResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([401, 404], { endpoint }),
  }
}
