import { z } from 'zod'
import ky, { type KyInstance, type Options } from 'ky'

import { PrintfulError, PrintfulErrorCode } from '@printful-ts/errors'
import {
  Locale,
  PrintfulVersion,
  PrintfulConfig,
  OAuthScopeValue,
  GetOAuthScopesResponse,
  StoreId,
} from '@printful-ts/schemas'
import {
  AUTHORIZATION_HEADER,
  LANGUAGE_HEADER,
  STORE_ID_HEADER,
} from '@printful-ts/constants'

type RequestOptions = Options & {
  validateResponseSchema?: boolean
  locale?: Locale
  store_id?: number
  checkScopes?: Array<OAuthScopeValue>
}

export abstract class PrintfulApiService {
  private privateToken: string
  private baseUrl: string
  private version: PrintfulVersion
  private api: KyInstance

  constructor(config: PrintfulConfig) {
    const { success, data, error } = PrintfulConfig.safeParse(config)

    if (!success) {
      throw new PrintfulError(
        error.issues.toLocaleString(),
        PrintfulErrorCode.Enum.SCHEMA_ERROR,
      )
    }

    this.privateToken = data.privateToken
    this.baseUrl = data.baseUrl
    this.version = data.version

    this.api = this.configure()
  }

  protected getBaseUrl() {
    if (this.version === 'v1') {
      return this.baseUrl
    }
    return `${this.baseUrl}/${this.version}`
  }

  protected async isAllowed(scopes: Array<OAuthScopeValue>) {
    const {
      success,
      data: requiredScopes,
      error,
    } = z.array(OAuthScopeValue).safeParse(scopes)

    if (!success) {
      throw new PrintfulError(
        error.issues.toLocaleString(),
        PrintfulErrorCode.Enum.SCHEMA_ERROR,
      )
    }

    const response = await this.request(
      '/oauth-scopes',
      {},
      GetOAuthScopesResponse,
    )
    const allowedScopes = response.data?.map(scope => scope.value)

    return requiredScopes.every(scope => allowedScopes.includes(scope))
  }

  private configure({
    locale: language,
    store_id,
    checkScopes,
    ...options
  }: RequestOptions = {}) {
    const defaultOptions: Options = Object.assign({}, options, {
      headers: {
        ...options.headers,
        'Content-Type': 'application/json',
      },
      prefixUrl: this.getBaseUrl(),
      hooks: {
        ...options.hooks,
        beforeRequest: [
          async request => {
            request.headers.set(
              AUTHORIZATION_HEADER,
              `Bearer ${this.privateToken}`,
            )
            if (store_id) {
              request.headers.set(
                STORE_ID_HEADER,
                StoreId.parse(store_id).toString(),
              )
            }
            if (language) {
              request.headers.set(LANGUAGE_HEADER, Locale.parse(language))
            }
            if (checkScopes) {
              const isAllowed = await this.isAllowed(checkScopes)
              if (!isAllowed) {
                throw new PrintfulError(
                  'You are not allowed to perform this action',
                  PrintfulErrorCode.Enum.FORBIDDEN,
                )
              }
            }
          },
        ],
      },
    } as Options)

    return ky.create(defaultOptions)
  }

  protected async request<T>(
    endpoint: string,
    requestOptions?: RequestOptions,
    schema?: z.ZodSchema<T>,
  ): Promise<T> {
    const { validateResponseSchema: validateSchema, ...options } =
      requestOptions || {
        validateResponseSchema: process.env.PRINTFUL_SCHEMA_VALIDATION
          ? process.env.PRINTFUL_SCHEMA_VALIDATION === 'true'
          : !!schema,
      }

    this.api = this.configure({
      hooks: {
        afterResponse: [
          async (_request, _options, response) => {
            if (!schema || !validateSchema) {
              return response
            }

            const jsonResponse = await response.clone().json()
            schema.parse(jsonResponse)

            return response
          },
        ],
      },
    })

    return await this.api<T>(endpoint, options).json()
  }
}
