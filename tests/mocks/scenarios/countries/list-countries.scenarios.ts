import { http, HttpResponse } from 'msw'

import { ListCountriesSearchParams } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { listCountriesResponseMock } from 'tests/mocks/schemas'
import {
  generateErrorScenarios,
  validateRequestSchema,
} from 'tests/mocks/utils'
import { PrintfulApiResources } from '@printful-ts/constants'

export const listCountriesScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.COUNTRIES}`

  return {
    success: [
      http.get(endpoint, ({ params }) => {
        const { success, response: errorResponse } = validateRequestSchema(
          ListCountriesSearchParams,
          params,
        )

        if (!success) {
          return errorResponse
        }

        return HttpResponse.json(listCountriesResponseMock(), { status: 200 })
      }),
    ],
    errors: generateErrorScenarios([400], { endpoint }),
  }
}
