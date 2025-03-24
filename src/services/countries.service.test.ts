import { HTTPError, type Options } from 'ky'
import { beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest'

import { PrintfulApiResources } from '@printful-ts/constants'
import {
  ListCountriesResponse,
  PrintfulResponseError,
  type ListCountriesSearchParams,
} from '@printful-ts/schemas'

import {
  CountriesServiceMock,
  mockServer,
  listCountriesScenarios,
} from 'tests/mocks'
import { faker } from '@faker-js/faker'

describe('CountriesService', () => {
  let service: CountriesServiceMock
  let requestSpy: MockInstance<typeof service.makeRequest>

  beforeEach(() => {
    service = new CountriesServiceMock()
    requestSpy = vi.spyOn(service, 'makeRequest')
  })

  describe('listCountries', () => {
    const errorScenarios = listCountriesScenarios().errors

    it('should make the request with provided searchParams and return valid response', async () => {
      const searchParams: ListCountriesSearchParams = {
        limit: 10,
        offset: 1,
      }

      const response = await service.listCountries(searchParams)

      expect(requestSpy).toHaveBeenCalledWith(
        PrintfulApiResources.COUNTRIES,
        { searchParams },
        ListCountriesResponse,
      )

      expect(ListCountriesResponse.safeParse(response).success).toBe(true)
    })

    it('should make the request with provided searchParams and options and return valid response', async () => {
      const searchParams: ListCountriesSearchParams = {
        limit: 10,
        offset: 1,
      }

      const options: Options = {
        headers: {
          'x-test-header': faker.word.sample(),
        },
      }

      const response = await service.listCountries(searchParams, options)

      expect(requestSpy).toHaveBeenCalledWith(
        PrintfulApiResources.COUNTRIES,
        { ...options, searchParams },
        ListCountriesResponse,
      )

      expect(ListCountriesResponse.safeParse(response).success).toBe(true)
    })

    it('should make the request method when no argument is not provided', async () => {
      const response = await service.listCountries()

      expect(requestSpy).toHaveBeenCalledWith(
        PrintfulApiResources.COUNTRIES,
        {},
        ListCountriesResponse,
      )

      expect(ListCountriesResponse.safeParse(response).success).toBe(true)
    })

    it.each(errorScenarios)(
      `should make the request and return $status error response`,
      mockServer.boundary(async ({ handler, responseMock }) => {
        mockServer.use(handler)

        const response = await service.listCountries()
        expect(response).toEqual(responseMock)

        expect(PrintfulResponseError.safeParse(response).success).toBe(true)
      }),
    )

    it.each(errorScenarios)(
      `should intercept HTTP $status response and throw HTTPError`,
      mockServer.boundary(async ({ handler }) => {
        mockServer.use(handler)

        await expect(
          service.listCountries(undefined, {
            throwHttpErrors: true,
          }),
        ).rejects.toThrow(HTTPError)
      }),
    )
  })
})
