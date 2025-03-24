import { faker } from '@faker-js/faker'
import ky from 'ky'
import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest'
import { z, ZodError } from 'zod'

import { OAuthScopeValue, type RequestOptions } from '@printful-ts/schemas'

import {
  getOAuthScopesResponseMock,
  mockServer,
  PrintfulApiServiceMock,
} from 'tests/mocks'

describe('PrintfulApiService', () => {
  let service: PrintfulApiServiceMock
  let createSpy: MockInstance<typeof ky.create>

  beforeEach(() => {
    service = new PrintfulApiServiceMock()
    createSpy = vi.spyOn(ky, 'create')
  })

  it('should initialize with the correct configuration', () => {
    expect(service.getPrivateToken()).toBe('fake-token')
    expect(service.getBaseUrl()).toBe('https://api.printful.com/v2')
    expect(service.getVersion()).toBe('v2')
  })

  it('should get the correct base URL based on version', () => {
    service.setVersion('v1')
    expect(service.getBaseUrl()).toBe('https://api.printful.com')

    service.setVersion('v2')
    expect(service.getBaseUrl()).toBe('https://api.printful.com/v2')
  })

  it(
    'should check if scopes are allowed',
    mockServer.boundary(async () => {
      const mockResponse = getOAuthScopesResponseMock()

      mockServer.use(
        http.get(`${service.getBaseUrl(false)}/oauth-scopes`, async () =>
          HttpResponse.json(mockResponse, { status: 200 }),
        ),
      )

      const isAllowed = await service.checkScopes(
        mockResponse.data.map(scope => scope.value),
      )

      expect(isAllowed).toBe(true)
    }),
  )

  it('should configure ky with the correct options', () => {
    const baseOptions: RequestOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
      prefixUrl: 'https://api.printful.com/v2',
      hooks: {
        beforeRequest: [() => {}],
      },
    }

    const requestOptions: RequestOptions = {
      locale: 'en_US',
      store_id: 123,
      headers: {
        'x-test-header': 'test-value',
      },
      retry: 0,
    }

    service.configure(requestOptions)

    expect(createSpy).toHaveBeenCalledTimes(1)
    expect(createSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        headers: expect.objectContaining({
          ...baseOptions.headers,
          ...requestOptions.headers,
        }),
      }),
    )
  })

  it(
    'should return schema parsed data',
    mockServer.boundary(async () => {
      const SchemaMock = z.object({ data: z.string() })
      const endpoint = `endpoint-${faker.hacker.noun()}-${faker.number.int()}`

      const endpointResponseMock = {
        data: faker.lorem.words(),
      }

      mockServer.use(
        http.get(`${service.getBaseUrl()}/${endpoint}`, async () => {
          const response = { ...endpointResponseMock }
          return HttpResponse.json(response, { status: 200 })
        }),
      )

      const result = await service.makeRequest(endpoint, {}, SchemaMock)
      expect(result).toEqual(endpointResponseMock)

      expect(SchemaMock.safeParse(result).success).toBe(true)
    }),
  )

  it(
    'should throw ZodError if response does not match schema',
    mockServer.boundary(async () => {
      const requestOptions = { validateResponseSchema: true }
      const endpoint = faker.lorem.slug()

      const endpointResponseMock = {
        [faker.lorem.word().toLowerCase()]: faker.lorem.words(),
      }

      mockServer.use(
        http.get(`${service.getBaseUrl()}/${endpoint}`, async () =>
          HttpResponse.json(endpointResponseMock, { status: 200 }),
        ),
      )

      const SchemaMock = z.object({ key: z.string() })

      await expect(
        service.makeRequest(endpoint, requestOptions, SchemaMock),
      ).rejects.toThrowError(ZodError)
    }),
  )

  it(
    'should not validate response schema if not provided',
    mockServer.boundary(async () => {
      const endpoint = faker.lorem.slug()
      const endpointResponseMock = {
        [faker.lorem.word().toLowerCase()]: faker.lorem.words(),
      }

      mockServer.use(
        http.get(`${service.getBaseUrl()}/${endpoint}`, async () =>
          HttpResponse.json(endpointResponseMock, { status: 200 }),
        ),
      )

      const result = await service.makeRequest(endpoint)
      expect(result).toEqual(endpointResponseMock)
    }),
  )

  it(
    'should return false if scopes are not allowed',
    mockServer.boundary(async () => {
      const mockResponse = getOAuthScopesResponseMock()

      mockResponse.data = mockResponse.data.filter(
        ({ value }) => value !== OAuthScopeValue.Enum.orders,
      )
      mockServer.use(
        http.get(`${service.getBaseUrl(false)}/oauth-scopes`, async () =>
          HttpResponse.json(mockResponse, { status: 200 }),
        ),
      )

      const response = await service.checkScopes(
        [OAuthScopeValue.Enum.orders],
        {
          validateInputSchema: false,
          validateResponseSchema: false,
        },
      )

      expect(response).toBe(false)
    }),
  )
})
