import { HTTPError, type Options } from 'ky'
import { beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest'
import { ZodError } from 'zod'

import { PrintfulApiResources } from '@printful-ts/constants'
import {
  GetStoreResponse,
  GetStoreStatisticsResponse,
  GetStoreStatisticsSearchInput,
  ListStoresResponse,
  PrintfulResponseError,
  type RequestOptions,
} from '@printful-ts/schemas'

import {
  getStoreScenarios,
  getStoreStatisticsScenarios,
  getStoreStatisticsSearchInputMock,
  idMock,
  listStoresScenarios,
  mockServer,
  StoresServiceMock,
} from 'tests/mocks'

describe('StoresService', () => {
  let service: StoresServiceMock
  let requestSpy: MockInstance<typeof service.makeRequest>

  beforeEach(() => {
    service = new StoresServiceMock()
    requestSpy = vi.spyOn(service, 'makeRequest')
  })

  describe('listStores', () => {
    const errorScenarios = listStoresScenarios().errors

    it('should make the request with correct parameters with store_id in headers', async () => {
      const store_id = idMock()
      const options: Options = {
        headers: {
          'x-test-request': 'true',
        },
      }

      const response = await service.listStores(store_id, options)

      expect(requestSpy).toHaveBeenCalledWith(
        PrintfulApiResources.STORES,
        { ...options, store_id },
        ListStoresResponse,
      )

      expect(ListStoresResponse.safeParse(response).success).toBe(true)
    })

    it('should make the request with correct parameters without store_id in headers', async () => {
      const options: Options = {}

      const response = await service.listStores(undefined, options)

      expect(requestSpy).toHaveBeenCalledWith(
        PrintfulApiResources.STORES,
        { ...options },
        ListStoresResponse,
      )

      expect(ListStoresResponse.safeParse(response).success).toBe(true)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const response = await service.listStores()
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        await expect(
          service.listStores(undefined, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getStore', () => {
    const errorScenarios = getStoreScenarios().errors

    it('should make the request with correct parameters with store_id in headers', async () => {
      const store_id = idMock()
      const options: Options = {
        headers: {
          'x-test-request': 'true',
        },
      }

      const response = await service.getStore(store_id, options)

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.STORES}/${store_id}`,
        { ...options, store_id },
        GetStoreResponse,
      )

      expect(GetStoreResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const options: Options = {
        headers: {
          'x-test-request': 'true',
        },
      }

      await expect(service.getStore(undefined, options)).rejects.toThrowError(
        ZodError,
      )

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const response = await service.getStore(idMock())
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        await expect(
          service.getStore(idMock(), {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })

  describe('getStoreStatistics', () => {
    const errorScenarios = getStoreStatisticsScenarios().errors

    it('should call the request method and return a valid response', async () => {
      const store_id = idMock()
      const input: GetStoreStatisticsSearchInput =
        getStoreStatisticsSearchInputMock()

      const options: RequestOptions = {
        headers: {
          'x-test-request': 'true',
        },
      }

      const response = await service.getStoreStatistics(
        store_id,
        input,
        options,
      )

      expect(requestSpy).toHaveBeenCalledWith(
        `${PrintfulApiResources.STORES}/${store_id}/statistics`,
        {
          ...options,
          store_id,
          searchParams: GetStoreStatisticsSearchInput.parse(input),
        },
        GetStoreStatisticsResponse,
      )

      expect(GetStoreStatisticsResponse.safeParse(response).success).toBe(true)
    })

    it('should throw ZodError if input is invalid', async () => {
      const store_id = idMock()
      const input: GetStoreStatisticsSearchInput = {
        currency: 'BRL',
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
        service.getStoreStatistics(store_id, input, options),
      ).rejects.toThrowError(ZodError)
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const input = getStoreStatisticsSearchInputMock()

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
        service.getStoreStatistics(undefined, input, options),
      ).rejects.toThrowError(ZodError)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const store_id = idMock()
        const input = getStoreStatisticsSearchInputMock()

        const response = await service.getStoreStatistics(store_id, input)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        const store_id = idMock()
        const input = getStoreStatisticsSearchInputMock()

        await expect(
          service.getStoreStatistics(store_id, input, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })
})
