import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { GetStoreStatisticsSearchParams } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { getStoreStatisticsResponseMock } from 'tests/mocks/schemas'
import {
  checkStoreIdHeader,
  generateErrorScenarios,
  validateRequestSchema,
} from 'tests/mocks/utils'

export const getStoreStatisticsScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.STORES}/:storeId/statistics`

  return {
    success: [
      http.get(endpoint, ({ request }) => {
        const { success, response } = checkStoreIdHeader(request)
        if (!success) {
          return response
        }

        const searchParams = Object.fromEntries(
          new URL(request.url).searchParams,
        )

        const { success: isValidSearchParams, response: errorResponse } =
          validateRequestSchema(GetStoreStatisticsSearchParams, searchParams)

        if (!isValidSearchParams) {
          return errorResponse
        }

        return HttpResponse.json(getStoreStatisticsResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([400, 401, 404], { endpoint }),
  }
}
