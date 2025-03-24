import { setupServer } from 'msw/node'
import { generateHandlers } from './handlers'

export const mockServer = setupServer(...generateHandlers())
