import { beforeAll, afterEach, afterAll, vi } from 'vitest'

import { mockServer } from './mocks/msw/msw.server'

mockServer.events.on('response:mocked', async ({ requestId, response }) => {
  response.headers.set('x-msw-request', requestId)
  response.headers.set('x-msw-mocked', 'true')
})

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
