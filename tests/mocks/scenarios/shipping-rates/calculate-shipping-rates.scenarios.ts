import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { CalculateShippingRatesBody } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { calculateShippingRatesResponseMock } from 'tests/mocks/schemas'
import {
  generateErrorScenarios,
  getRequestBody,
  validateRequestSchema,
} from 'tests/mocks/utils'

export const calculateShippingRatesScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.SHIPPING_RATES}`

  return {
    success: [
      http.post(endpoint, async ({ request }) => {
        const body = await getRequestBody(request)

        const { success, response: errorResponse } = validateRequestSchema(
          CalculateShippingRatesBody.omit({ store_id: true, locale: true }),
          body,
        )

        if (!success) {
          return errorResponse
        }

        return HttpResponse.json(calculateShippingRatesResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([400], { endpoint, method: 'post' }),
  }
}
