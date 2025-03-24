import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { getStoreResponseMock } from 'tests/mocks/schemas'
import { checkStoreIdHeader, generateErrorScenarios } from 'tests/mocks/utils'

export const getStoreScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.STORES}/:storeId`

  return {
    success: [
      http.get(endpoint, ({ request }) => {
        const { success, response } = checkStoreIdHeader(request)

        if (!success) {
          return response
        }

        return HttpResponse.json(getStoreResponseMock(), { status: 200 })
      }),
    ],
    errors: generateErrorScenarios([400, 401, 404], { endpoint }),
  }
}
