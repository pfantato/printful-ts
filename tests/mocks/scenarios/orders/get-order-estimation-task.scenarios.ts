import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { checkStoreIdHeader, generateErrorScenarios } from 'tests/mocks/utils'
import { getOrderEstimationTaskResponseMock } from 'tests/mocks/schemas'
import { z } from 'zod'

export const getOrderEstimationTasksScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDER_ESTIMATION_TASKS}/:task_id`

  return {
    success: [
      http.get(endpoint, ({ request, params }) => {
        const pathParams =
          typeof params === 'object' && params !== null
            ? params
            : JSON.parse(JSON.stringify(params))

        const { success: hasValidStoreId, response: badRequestResponse } =
          checkStoreIdHeader(request)
        if (!hasValidStoreId) {
          return badRequestResponse
        }

        const isValidPath = z.string().parse(pathParams.task_id)
        if (!isValidPath) {
          return badRequestResponse
        }

        return HttpResponse.json(getOrderEstimationTaskResponseMock(), {
          status: 200,
        })
      }),
    ],
    errors: generateErrorScenarios([401, 404, 500], {
      endpoint,
    }),
  }
}
