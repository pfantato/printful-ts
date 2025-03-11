import { PrintfulError, PrintfulErrorCode } from './printful.error'

export class RequestError extends PrintfulError {
  status: number

  constructor(
    message: string,
    status: number = 500,
    code: PrintfulErrorCode = PrintfulErrorCode.Enum.API_ERROR,
  ) {
    super(message, code)
    this.name = 'RequestError'
    this.code = code
    this.status = status
    this.message = `[Printful API] ${status} - ${message}`
    // Set the prototype explicitly to maintain the correct prototype chain
    Object.setPrototypeOf(this, RequestError.prototype)
  }
}
