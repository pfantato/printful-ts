import type {
  PrintfulConfig,
  PrintfulVersion,
  RequestOptions,
} from '@printful-ts/schemas'
import { PrintfulApiService } from '@printful-ts/services'

export class PrintfulApiServiceMock extends PrintfulApiService {
  constructor(
    config: PrintfulConfig = { privateToken: 'fake-token' },
    defaultOptions: RequestOptions = {
      headers: {
        'x-requested-by': 'vitest',
      },
      throwHttpErrors: false,
      retry: 0,
      cache: 'no-cache',
    },
  ) {
    super(config, defaultOptions)
  }

  public getDefaultOptions() {
    return this.defaultOptions
  }

  public getPrivateToken() {
    return this.privateToken
  }

  public getVersion() {
    return this.version
  }

  public setVersion(version: PrintfulVersion) {
    this.version = version
  }
}
