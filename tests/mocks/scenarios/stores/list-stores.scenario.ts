import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { listStoresResponseMock } from 'tests/mocks/schemas'
import { generateErrorScenarios } from 'tests/mocks/utils'

export const listStoresScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.STORES}`

  return {
    success: [
      http.get(endpoint, () => {
        return HttpResponse.json(listStoresResponseMock(), { status: 200 })
      }),
    ],
    errors: generateErrorScenarios([400, 401, 404], { endpoint }),
  }
}
