import { z } from 'zod'

export const PrintfulErrorCode = z.enum([
  'SCHEMA_ERROR',
  'REQUEST_ERROR',
  'API_ERROR',
  'NOT_FOUND',
  'UNAUTHORIZED',
  'FORBIDDEN',
  'SERVICE_UNAVAILABLE',
  'BAD_REQUEST',
  'TOO_MANY_REQUESTS',
  'PAYMENT_REQUIRED',
  'PRECONDITION_FAILED',
  'INTERNAL_SERVER_ERROR',
])
export type PrintfulErrorCode = z.infer<typeof PrintfulErrorCode>

export class PrintfulError extends Error {
  name: string
  message: string
  code: string

  constructor(
    message: string,
    code: PrintfulErrorCode = PrintfulErrorCode.Enum.INTERNAL_SERVER_ERROR,
  ) {
    super(message)
    this.name = 'PrintfulError'
    this.code = code
    this.message = message
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, PrintfulError.prototype)
  }
}
