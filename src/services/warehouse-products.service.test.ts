import { HTTPError } from 'ky'
import { beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest'
import { ZodError } from 'zod'

import { PrintfulApiResources } from '@printful-ts/constants'
import {
  GetWarehouseProductResponse,
  ListWarehouseProductsResponse,
  ListWarehouseProductsSearchInput,
  PrintfulResponseError,
} from '@printful-ts/schemas'

import {
  getWarehouseProductScenarios,
  idMock,
  listWarehouseProductsScenarios,
  listWarehouseProductsSearchInputMock,
  mockServer,
  WarehouseProductsServiceMock,
} from 'tests/mocks'

describe('WarehouseProductsService', () => {
  let service: WarehouseProductsServiceMock
  let requestSpy: MockInstance<typeof service.makeRequest>

  beforeEach(() => {
    service = new WarehouseProductsServiceMock()
    requestSpy = vi.spyOn(service, 'makeRequest')
  })

  describe('listWarehouseProducts', () => {
    it('should call the request method with correct parameters', async () => {
      const inputMock = listWarehouseProductsSearchInputMock()
      const { store_id, ...searchParams } =
        ListWarehouseProductsSearchInput.parse(inputMock)

      const response = await service.listWarehouseProducts(inputMock)

      expect(requestSpy).toHaveBeenCalledWith(
        PrintfulApiResources.WAREHOUSE_PRODUCTS,
        {
          store_id,
          searchParams,
        },
        ListWarehouseProductsResponse,
      )

      expect(ListWarehouseProductsResponse.safeParse(response).success).toBe(
        true,
      )
    })
    it('should call the request method with store_id parameter only', async () => {
      const { store_id, ...searchParams } =
        ListWarehouseProductsSearchInput.parse({ store_id: idMock() })

      const response = await service.listWarehouseProducts({ store_id })

      expect(requestSpy).toHaveBeenCalledWith(
        PrintfulApiResources.WAREHOUSE_PRODUCTS,
        {
          store_id,
          searchParams,
        },
        ListWarehouseProductsResponse,
      )

      expect(ListWarehouseProductsResponse.safeParse(response).success).toBe(
        true,
      )
    })

    const errorScenarios = listWarehouseProductsScenarios().errors

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const inputMock = listWarehouseProductsSearchInputMock()

        const response = await service.listWarehouseProducts(inputMock)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const inputMock = listWarehouseProductsSearchInputMock()

        await expect(
          service.listWarehouseProducts(inputMock, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getWarehouseProduct', () => {
    const errorScenarios = getWarehouseProductScenarios().errors

    it('should call the request method with correct parameters when store_id is provided', async () => {
      const warehouse_product_id = 1234
      const store_id = 10

      const response = await service.getWarehouseProduct(
        warehouse_product_id,
        store_id,
      )

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.WAREHOUSE_PRODUCTS}/${warehouse_product_id}`,
        {
          store_id,
        },
        GetWarehouseProductResponse,
      )

      expect(GetWarehouseProductResponse.safeParse(response).success).toBe(true)
    })

    it('should call the request method with correct parameters when store_id is not provided', async () => {
      const warehouse_product_id = 1234

      const response = await service.getWarehouseProduct(warehouse_product_id)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.WAREHOUSE_PRODUCTS}/${warehouse_product_id}`,
        {},
        GetWarehouseProductResponse,
      )

      expect(GetWarehouseProductResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError when warehouse_product_id is not provided', async () => {
      await expect(service.getWarehouseProduct(undefined)).rejects.toThrowError(
        ZodError,
      )

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const warehouse_product_id = idMock()

        const response = await service.getWarehouseProduct(warehouse_product_id)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        const store_id = idMock()
        const warehouse_product_id = idMock()

        await expect(
          service.getWarehouseProduct(warehouse_product_id, store_id, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })
})
