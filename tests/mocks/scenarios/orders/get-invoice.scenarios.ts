import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { generateErrorScenarios } from 'tests/mocks/utils'
import { getInvoiceResponseMock } from 'tests/mocks/schemas'

export const getOrderInvoiceScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDERS}/:orderId/invoices`

  return {
    success: [
      http.get(endpoint, () =>
        HttpResponse.json(getInvoiceResponseMock(), { status: 200 }),
      ),
    ],
    errors: generateErrorScenarios([401, 500], {
      endpoint,
    }),
  }
}
