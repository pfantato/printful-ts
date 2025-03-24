import { HTTPError, type Options } from 'ky'
import { beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest'
import { ZodError } from 'zod'

import { PrintfulApiResources, STORE_ID_HEADER } from '@printful-ts/constants'
import {
  CalculateShippingRatesBody,
  CalculateShippingRatesResponse,
  PrintfulResponseError,
} from '@printful-ts/schemas'

import {
  calculateShippingRatesScenarios,
  mockServer,
  ShippingRatesServiceMock,
} from 'tests/mocks'
import { calculateShippingRatesBodyMock } from 'tests/mocks/schemas'

describe('ShippingRatesService', () => {
  let service: ShippingRatesServiceMock
  let requestSpy: MockInstance<typeof service.makeRequest>

  beforeEach(() => {
    service = new ShippingRatesServiceMock()
    requestSpy = vi.spyOn(service, 'makeRequest')
  })

  describe('calculateShippingRates', () => {
    const errorScenarios = calculateShippingRatesScenarios().errors

    it('should make the request with provided parameters', async () => {
      const body: CalculateShippingRatesBody = calculateShippingRatesBodyMock()

      const { locale, store_id, ...json } =
        CalculateShippingRatesBody.parse(body)

      const response = await service.calculateShippingRates(body)

      const expectedOptions = {
        locale,
        store_id,
        json,
        method: 'post',
      }

      expect(requestSpy).toHaveBeenCalledWith(
        PrintfulApiResources.SHIPPING_RATES,
        expectedOptions,
        CalculateShippingRatesResponse,
      )

      expect(CalculateShippingRatesResponse.safeParse(response).success).toBe(
        true,
      )
    })

    it('should throw ZodError if body is invalid', async () => {
      const { store_id, recipient, ...body } = calculateShippingRatesBodyMock()

      const options: Options = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      expect(body).not.toContain(expect.objectContaining({ store_id }))
      expect(body).not.toContain(expect.objectContaining({ recipient }))

      await expect(
        service.calculateShippingRates(body, options),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it('should throw ZodError if store_id is not provided', async () => {
      const { store_id, ...body } = calculateShippingRatesBodyMock()

      const options: Options = {
        headers: {
          [STORE_ID_HEADER]: `${store_id}`,
        },
      }

      await expect(
        service.calculateShippingRates(body, options),
      ).rejects.toThrowError(ZodError)

      expect(requestSpy).not.toHaveBeenCalled()
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)
        const body: CalculateShippingRatesBody =
          calculateShippingRatesBodyMock()

        const response = await service.calculateShippingRates(body)
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)
        const body: CalculateShippingRatesBody =
          calculateShippingRatesBodyMock()

        await expect(
          service.calculateShippingRates(body, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })
})
