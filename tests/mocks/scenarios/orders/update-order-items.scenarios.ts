import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'
import { OrderItemBody, OrderItemPathParams } from '@printful-ts/schemas'

import { BASE_URL } from 'tests/mocks/constants'
import { orderItemResponseMock } from 'tests/mocks/schemas'
import {
  checkStoreIdHeader,
  generateErrorScenarios,
  getRequestBody,
  validateRequestSchema,
} from 'tests/mocks/utils'

export const updateOrderItemScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.ORDERS}/:order_id/order-items/:order_item_id`

  return {
    success: [
      http.patch(endpoint, async ({ request, params }) => {
        const {
          success: hasStoreId,
          store_id,
          response: storeIdErrorResponse,
        } = checkStoreIdHeader(request)

        if (!hasStoreId) {
          return storeIdErrorResponse
        }

        const pathParams =
          typeof params === 'object' && params !== null
            ? params
            : JSON.parse(JSON.stringify(params))

        const { success: paramsSuccess, response: paramsErrorResponse } =
          validateRequestSchema(OrderItemPathParams, pathParams)

        if (!paramsSuccess) {
          return paramsErrorResponse
        }

        const body = await getRequestBody<OrderItemBody>(request)

        const { success, response: errorResponse } = validateRequestSchema(
          OrderItemBody,
          { ...body, store_id },
        )

        if (!success) {
          return errorResponse
        }

        return HttpResponse.json(orderItemResponseMock(), { status: 200 })
      }),
    ],
    errors: generateErrorScenarios([400, 401, 403, 404], {
      endpoint,
      method: 'patch',
    }),
  }
}
