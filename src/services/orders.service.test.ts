import { faker } from '@faker-js/faker'
import { HTTPError, type Options } from 'ky'
import { beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest'
import { ZodError } from 'zod'

import { PrintfulApiResources, STORE_ID_HEADER } from '@printful-ts/constants'
import {
  ConfirmOrderResponse,
  OrderBody,
  OrderItemBody,
  OrderItemResponse,
  GetOrderItemResponse,
  ListOrderItemsResponse,
  ListOrderItemsSearchInput,
  ListOrdersResponse,
  ListOrdersSearchInput,
  OrderResponse,
  PrintfulResponseError,
  type RequestOptions,
  ListOrderShipmentsSearchInput,
  ListOrderShipmentsResponse,
  GetInvoiceResponse,
  GetOrderEstimationTaskResponse,
  CreateOrderEstimationTaskBody,
  CreateOrderEstimationTaskResponse,
} from '@printful-ts/schemas'

import {
  confirmOrderScenarios,
  createOrderBodyMock,
  orderItemBodyMock,
  createOrderItemScenarios,
  createOrderScenarios,
  deleteOrderScenarios,
  externalIdMock,
  externalOrInternalIdMock,
  getOrderItemScenarios,
  getOrderScenarios,
  idMock,
  listOrderItemScenarios,
  listOrdersScenarios,
  listOrdersSearchInputMock,
  mockServer,
  orderItemPathParamsMock,
  OrdersServiceMock,
  updateOrderScenarios,
  updateOrderItemScenarios,
  deleteOrderItemScenarios,
  listOrderShipmentsSearchInputMock,
  listOrderShipmentsScenarios,
  getOrderInvoiceScenarios,
  getOrderEstimationTasksScenarios,
  createOrderEstimationTasksScenarios,
  createOrderEstimationTaskBodyMock,
} from 'tests/mocks'
import { fromError } from 'zod-validation-error'

describe('OrdersService', () => {
  let service: OrdersServiceMock
  let requestSpy: MockInstance<typeof service.makeRequest>

  beforeEach(() => {
    service = new OrdersServiceMock()
    requestSpy = vi.spyOn(service, 'makeRequest')
  })

  describe('listOrders', () => {
    it('should make the request with correct parameters with store_id in headers', async () => {
      const inputMock = listOrdersSearchInputMock()
      const { store_id, ...searchParams } =
        ListOrdersSearchInput.parse(inputMock)

      const response = await service.listOrders(inputMock)

      expect(requestSpy).toHaveBeenCalledWith(
        PrintfulApiResources.ORDERS,
        {
          store_id,
          searchParams,
        },
        ListOrdersResponse,
      )

      expect(ListOrdersResponse.safeParse(response).success).toBe(true)
    })

    const errorScenarios = listOrdersScenarios().errors

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const response = await service.listOrders({ store_id: idMock() })
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        await expect(
          service.listOrders(
            { store_id: idMock() },
            {
              throwHttpErrors: true,
            },
          ),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getOrder', () => {
    it('should make the request with the provided parameters and return a valid response', async () => {
      const order_id = externalIdMock()
      const store_id = idMock()

      const response = await service.getOrder(order_id, store_id)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}/${order_id}`,
        {
          store_id,
        },
        OrderResponse,
      )

      expect(OrderResponse.safeParse(response).success).toBe(true)
    })

    it('should make the request without store_id and return a valid response', async () => {
      const order_id = externalIdMock()

      const response = await service.getOrder(order_id)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}/${order_id}`,
        {},
        OrderResponse,
      )

      expect(OrderResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError when order_id is not provided', async () => {
      await expect(service.getOrder(undefined)).rejects.toThrow(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    const errorScenarios = getOrderScenarios().errors

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const response = await service.getOrder(idMock())
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        await expect(
          service.getOrder(idMock(), undefined, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('createOrder', () => {
    it('should make the request with the provided body and return a valid request', async () => {
      const inputMock = createOrderBodyMock()
      const { store_id, ...json } = OrderBody.parse(inputMock)

      const response = await service.createOrder(inputMock)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}`,
        {
          method: 'post',
          json,
          store_id,
        },
        OrderResponse,
      )

      expect(OrderResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const { store_id, ...body } = OrderBody.parse(createOrderBodyMock())

      const options: Options = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(service.createOrder(body, options)).rejects.toThrowError(
        ZodError,
      )

      expect(requestSpy).not.toHaveBeenCalled()
    })

    const errorScenarios = createOrderScenarios().errors

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const body = createOrderBodyMock()

        const response = await service.createOrder(body)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const body = createOrderBodyMock()

        await expect(
          service.createOrder(body, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('updateOrder', () => {
    it('should make the request with the provided body and return a valid request', async () => {
      const { store_id, ...json } = OrderBody.parse(createOrderBodyMock())
      const order_id = idMock()

      const response = await service.updateOrder(order_id, {
        store_id,
        ...json,
      })

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}/${order_id}`,
        {
          method: 'patch',
          json,
          store_id,
        },
        OrderResponse,
      )

      expect(OrderResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const { store_id, ...body } = OrderBody.parse(createOrderBodyMock())
      const order_id = idMock()

      const options: Options = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.updateOrder(order_id, body, options),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError if order_id is not provided', async () => {
      const body = OrderBody.parse(createOrderBodyMock())

      const options: Options = {
        headers: {
          [STORE_ID_HEADER]: `${body.store_id}`,
        },
      }

      await expect(
        service.updateOrder(undefined, body, options),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    const errorScenarios = updateOrderScenarios().errors

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const order_id = idMock()
        const body = createOrderBodyMock()

        const response = await service.updateOrder(order_id, body)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const order_id = idMock()
        const body = createOrderBodyMock()

        await expect(
          service.updateOrder(order_id, body, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('confirmOrder', () => {
    it('should make the request with the provided body and return a valid request', async () => {
      const order_id = idMock()
      const store_id = idMock()

      const response = await service.confirmOrder(order_id, store_id)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}/${order_id}/confirmation`,
        {
          method: 'post',
          store_id,
        },
        ConfirmOrderResponse,
      )

      expect(ConfirmOrderResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const order_id = idMock()
      const store_id = idMock()

      const options: Options = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.confirmOrder(order_id, undefined, options),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError if order_id is not provided', async () => {
      const store_id = idMock()

      await expect(
        service.confirmOrder(undefined, store_id),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    const errorScenarios = confirmOrderScenarios().errors

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const order_id = idMock()
        const store_id = idMock()

        const response = await service.confirmOrder(order_id, store_id)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const store_id = idMock()
        const order_id = idMock()

        await expect(
          service.confirmOrder(order_id, store_id, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('deleteOrder', () => {
    it('should make the request with the provided body and return a valid request', async () => {
      const order_id = idMock()
      const store_id = idMock()

      await expect(
        service.deleteOrder(order_id, store_id),
      ).resolves.not.toThrow()

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}/${order_id}`,
        {
          method: 'delete',
          store_id,
          validateResponseSchema: false,
        },
      )
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const order_id = idMock()
      const store_id = idMock()

      const options: Options = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.updateOrder(order_id, undefined, options),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError if order_id is not provided', async () => {
      const store_id = idMock()

      await expect(
        service.deleteOrder(undefined, store_id),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    const errorScenarios = deleteOrderScenarios().errors

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const order_id = idMock()
        const store_id = idMock()

        const response = await service.deleteOrder(order_id, store_id)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const store_id = idMock()
        const order_id = idMock()

        await expect(
          service.deleteOrder(order_id, store_id, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('listOrderItems', () => {
    const errorScenarios = listOrderItemScenarios().errors

    it('should call the request method and return a valid response', async () => {
      const order_id = idMock()
      const inputMock = listOrdersSearchInputMock()
      const { store_id, ...searchParams } =
        ListOrderItemsSearchInput.parse(inputMock)

      const response = await service.listOrderItems(order_id, inputMock)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}/${order_id}/order-items`,
        {
          store_id,
          searchParams,
        },
        ListOrderItemsResponse,
      )

      expect(ListOrderItemsResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const { store_id: order_id, ...searchParams } =
        listOrdersSearchInputMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${order_id}`,
        },
      }

      await expect(
        service.listOrderItems(order_id, searchParams, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if order_id is not provided', async () => {
      const { store_id, ...searchParams } = listOrdersSearchInputMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.listOrderItems(undefined, searchParams, options),
      ).rejects.toThrowError(ZodError)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const order_id = idMock()
        const searchParams = listOrdersSearchInputMock()

        const response = await service.listOrderItems(order_id, searchParams)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        const order_id = idMock()
        const searchParams = listOrdersSearchInputMock()

        await expect(
          service.listOrderItems(order_id, searchParams, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getOrderItem', () => {
    const errorScenarios = getOrderItemScenarios().errors

    it('should call the request method and return a valid response', async () => {
      const store_id = idMock()
      const { order_id, order_item_id } = orderItemPathParamsMock()

      const response = await service.getOrderItem(
        { order_id, order_item_id },
        store_id,
      )

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}/${order_id}/order-items/${order_item_id}`,
        {
          store_id,
        },
        GetOrderItemResponse,
      )

      expect(GetOrderItemResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError if input is invalid', async () => {
      const store_id = idMock()

      await expect(service.getOrderItem({}, store_id)).rejects.toThrowError(
        ZodError,
      )
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const store_id = idMock()
      const path_params = orderItemPathParamsMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.getOrderItem(path_params, undefined, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if order_id is not provided', async () => {
      const store_id = idMock()
      const { order_item_id } = orderItemPathParamsMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${order_item_id}`,
        },
      }

      await expect(
        service.getOrderItem({ order_item_id }, store_id, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if order_item_id is not provided', async () => {
      const store_id = idMock()
      const { order_id } = orderItemPathParamsMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${order_id}`,
        },
      }

      await expect(
        service.getOrderItem({ order_id }, store_id, options),
      ).rejects.toThrowError(ZodError)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const store_id = idMock()
        const path_params = orderItemPathParamsMock()

        const response = await service.getOrderItem(path_params, store_id)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        const store_id = idMock()
        const path_params = orderItemPathParamsMock()

        await expect(
          service.getOrderItem(path_params, store_id, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('createOrderItem', () => {
    const errorScenarios = createOrderItemScenarios().errors

    it('should call the request method and return a valid response', async () => {
      const order_id = externalOrInternalIdMock()
      const inputMock = orderItemBodyMock()
      const { store_id, ...json } = OrderItemBody.parse(inputMock)

      const response = await service.createOrderItem(order_id, {
        ...json,
        store_id,
      })

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}/${order_id}/order-items`,
        {
          method: 'post',
          store_id,
          json,
        },
        OrderItemResponse,
      )

      expect(OrderItemResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError if input is invalid', async () => {
      const order_id = idMock()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { store_id, catalog_variant_id, ...json } = orderItemBodyMock()

      await expect(
        service.createOrderItem(order_id, { ...json, store_id }),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const order_id = idMock()

      const { store_id, ...json } = orderItemBodyMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.createOrderItem(order_id, json, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if order_id is not provided', async () => {
      const json = orderItemBodyMock()

      await expect(
        service.createOrderItem(undefined, json),
      ).rejects.toThrowError(ZodError)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const order_id = idMock()
        const json = orderItemBodyMock()

        const response = await service.createOrderItem(order_id, json)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        const order_id = idMock()
        const json = orderItemBodyMock()

        await expect(
          service.createOrderItem(order_id, json, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('updateOrderItem', () => {
    const errorScenarios = updateOrderItemScenarios().errors

    it('should call the request method and return a valid response', async () => {
      const inputMock = orderItemBodyMock()
      const { store_id, ...json } = OrderItemBody.parse(inputMock)

      const { order_id, order_item_id } = orderItemPathParamsMock()

      const response = await service.updateOrderItem(
        { order_id, order_item_id },
        inputMock,
      )

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}/${order_id}/order-items/${order_item_id}`,
        {
          method: 'patch',
          store_id,
          json,
        },
        OrderItemResponse,
      )

      const { success, error } = OrderItemResponse.safeParse(response)

      if (!success) {
        console.error(fromError(error).toString())
      }
      expect(success).toBe(true)
    })

    it('should throw ZodError if input is invalid', async () => {
      const path_params = orderItemPathParamsMock()

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { store_id, catalog_variant_id, ...json } = orderItemBodyMock()

      await expect(
        service.updateOrderItem(path_params, { ...json, store_id }),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const path_params = orderItemPathParamsMock()

      const { store_id, ...json } = orderItemBodyMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.updateOrderItem(path_params, json, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if order_id is not provided', async () => {
      const { order_item_id } = orderItemPathParamsMock()
      const json = orderItemBodyMock()

      await expect(
        service.updateOrderItem({ order_item_id }, json),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if order_item_id is not provided', async () => {
      const { order_id } = orderItemPathParamsMock()
      const json = orderItemBodyMock()

      await expect(
        service.updateOrderItem({ order_id }, json),
      ).rejects.toThrowError(ZodError)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const path_params = orderItemPathParamsMock()
        const body = orderItemBodyMock()

        const response = await service.updateOrderItem(path_params, body)

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        const path_params = orderItemPathParamsMock()
        const body = orderItemBodyMock()

        await expect(
          service.updateOrderItem(path_params, body, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('deleteOrderItem', () => {
    const errorScenarios = deleteOrderItemScenarios().errors

    it('should call the request method and return a valid response', async () => {
      const store_id = idMock()
      const { order_id, order_item_id } = orderItemPathParamsMock()

      await expect(
        service.deleteOrderItem({ order_id, order_item_id }, store_id),
      ).resolves.not.toThrow()

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}/${order_id}/order-items/${order_item_id}`,
        {
          method: 'delete',
          store_id,
          validateResponseSchema: false,
        },
      )
    })

    it('should throw ZodError if input is invalid', async () => {
      const store_id = idMock()

      await expect(service.deleteOrderItem({}, store_id)).rejects.toThrowError(
        ZodError,
      )
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const store_id = idMock()
      const path_params = orderItemPathParamsMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.deleteOrderItem(path_params, undefined, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if order_id is not provided', async () => {
      const store_id = idMock()
      const { order_item_id } = orderItemPathParamsMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${order_item_id}`,
        },
      }

      await expect(
        service.deleteOrderItem({ order_item_id }, store_id, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if order_item_id is not provided', async () => {
      const store_id = idMock()
      const { order_id } = orderItemPathParamsMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${order_id}`,
        },
      }

      await expect(
        service.deleteOrderItem({ order_id }, store_id, options),
      ).rejects.toThrowError(ZodError)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const store_id = idMock()
        const path_params = orderItemPathParamsMock()

        const response = await service.deleteOrderItem(path_params, store_id)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        const store_id = idMock()
        const path_params = orderItemPathParamsMock()

        await expect(
          service.deleteOrderItem(path_params, store_id, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('listShipments', () => {
    const errorScenarios = listOrderShipmentsScenarios().errors

    it('should call the request method and return a valid response', async () => {
      const order_id = idMock()
      const inputMock = listOrderShipmentsSearchInputMock()
      const { store_id, ...searchParams } =
        ListOrderShipmentsSearchInput.parse(inputMock)

      const response = await service.listShipments(order_id, inputMock)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}/${order_id}/shipments`,
        {
          store_id,
          searchParams,
        },
        ListOrderShipmentsResponse,
      )

      expect(ListOrderShipmentsResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError if input is invalid', async () => {
      const order_id = idMock()
      const inputMock: ListOrderShipmentsSearchInput = {
        limit: -10,
      }

      const options: RequestOptions = {
        headers: {
          'x-test-request': 'true',
        },
        validateInputSchema: false,
        retry: {
          limit: 1,
        },
      }

      await expect(
        service.listShipments(order_id, inputMock, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const { store_id: order_id, ...searchParams } =
        listOrderShipmentsSearchInputMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${order_id}`,
        },
      }

      await expect(
        service.listShipments(order_id, searchParams, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if order_id is not provided', async () => {
      const { store_id, ...searchParams } = listOrderShipmentsSearchInputMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.listShipments(undefined, searchParams, options),
      ).rejects.toThrowError(ZodError)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const order_id = idMock()
        const searchParams = listOrderShipmentsSearchInputMock()

        const response = await service.listShipments(order_id, searchParams)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        const order_id = idMock()
        const searchParams = listOrderShipmentsSearchInputMock()

        await expect(
          service.listShipments(order_id, searchParams, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getInvoice', () => {
    const errorScenarios = getOrderInvoiceScenarios().errors

    it('should call the request method and return a valid response', async () => {
      const order_id = externalOrInternalIdMock()
      const store_id = idMock()

      const response = await service.getInvoice(order_id, store_id)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDERS}/${order_id}/invoices`,
        {
          store_id,
        },
        GetInvoiceResponse,
      )

      expect(GetInvoiceResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const order_id = externalOrInternalIdMock()
      const store_id = idMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.getInvoice(order_id, undefined, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if order_id is not provided', async () => {
      const store_id = idMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.getInvoice(undefined, store_id, options),
      ).rejects.toThrowError(ZodError)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const order_id = externalOrInternalIdMock()
        const store_id = idMock()

        const response = await service.getInvoice(order_id, store_id)

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        const order_id = externalOrInternalIdMock()
        const store_id = idMock()

        await expect(
          service.getInvoice(order_id, store_id, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getOrderEstimationTask', () => {
    const errorScenarios = getOrderEstimationTasksScenarios().errors

    it('should call the request method and return a valid response', async () => {
      const task_id = faker.lorem.slug()
      const store_id = idMock()

      const response = await service.getOrderEstimationTask(task_id, store_id)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDER_ESTIMATION_TASKS}/${task_id}`,
        {
          store_id,
        },
        GetOrderEstimationTaskResponse,
      )

      expect(GetOrderEstimationTaskResponse.safeParse(response).success).toBe(
        true,
      )
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const task_id = faker.lorem.slug()
      const store_id = idMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.getOrderEstimationTask(task_id, undefined, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if task_id is not provided', async () => {
      const store_id = idMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.getOrderEstimationTask(undefined, store_id, options),
      ).rejects.toThrowError(ZodError)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const task_id = faker.lorem.slug()
        const store_id = idMock()

        const response = await service.getOrderEstimationTask(task_id, store_id)

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        const task_id = faker.lorem.slug()
        const store_id = idMock()

        await expect(
          service.getOrderEstimationTask(task_id, store_id, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('createOrderEstimationTask', () => {
    const errorScenarios = createOrderEstimationTasksScenarios().errors

    it('should call the request method and return a valid response', async () => {
      const inputMock = createOrderEstimationTaskBodyMock()

      const { store_id, ...json } =
        CreateOrderEstimationTaskBody.parse(inputMock)

      const response = await service.createOrderEstimationTask(inputMock)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.ORDER_ESTIMATION_TASKS}`,
        {
          method: 'post',
          store_id,
          json,
        },
        CreateOrderEstimationTaskResponse,
      )

      expect(
        CreateOrderEstimationTaskResponse.safeParse(response).success,
      ).toBe(true)
    })

    it('should throw ZodError if body is invalid', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { store_id, recipient, ...json } =
        createOrderEstimationTaskBodyMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.createOrderEstimationTask({ ...json, store_id }, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const { store_id, ...body } = createOrderEstimationTaskBodyMock()

      const options: RequestOptions = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.createOrderEstimationTask(body, options),
      ).rejects.toThrowError(ZodError)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const body = createOrderEstimationTaskBodyMock()

        const response = await service.createOrderEstimationTask(body)

        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        const body = createOrderEstimationTaskBodyMock()

        await expect(
          service.createOrderEstimationTask(body, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })
})
