import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { createOrderEstimationTaskResponseMock } from 'tests/mocks/schemas'
import {
  checkStoreIdHeader,
  generateErrorScenarios,
  getRequestBody,
  validateRequestSchema,
} from 'tests/mocks/utils'
import { CreateOrderEstimationTaskBody } from '@printful-ts/schemas'

export const createOrderEstimationTasksScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDER_ESTIMATION_TASKS}`

  return {
    success: [
      http.post(endpoint, async ({ request }) => {
        const {
          success: hasValidStoreId,
          store_id,
          response: badRequestResponse,
        } = checkStoreIdHeader(request)

        if (!hasValidStoreId) {
          return badRequestResponse
        }

        const body =
          await getRequestBody<CreateOrderEstimationTaskBody>(request)

        const { success, response: errorResponse } = validateRequestSchema(
          CreateOrderEstimationTaskBody,
          { store_id, ...body },
        )

        if (!success) {
          return errorResponse
        }

        return HttpResponse.json(createOrderEstimationTaskResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([400, 500], {
      endpoint,
      method: 'post',
    }),
  }
}
