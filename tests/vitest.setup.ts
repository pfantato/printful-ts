import { beforeAll, afterEach, afterAll, vi } from 'vitest'
import { install } from 'zod-schema-faker'

import { mockServer } from './mocks/msw/msw.server'
import { logger } from '@printful-ts/utils'

install()

mockServer.events.on(
  'response:mocked',
  async ({ request, requestId, response }) => {
    response.headers.set('x-msw-request', requestId)
    response.headers.set('x-msw-mocked', 'true')

    logger.info(
      Object.fromEntries(response.headers),
      `[MSW intercepted request]: HTTP ${response.status} - ${request.method} ${request.url}`,
    )
  },
)

global.fetch = fetch

beforeAll(() =>
  mockServer.listen({
    onUnhandledRequest: 'error',
  }),
)

afterEach(() => mockServer.resetHandlers())
afterAll(() => {
  mockServer.close()
  vi.clearAllMocks()
  vi.restoreAllMocks()
  vi.resetAllMocks()
})
