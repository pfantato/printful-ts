import bourne from '@hapi/bourne'
import ky, { type KyInstance, type Options } from 'ky'
import { HttpResponse } from 'msw'
import { z, type AnyZodObject } from 'zod'

import {
  AUTHORIZATION_HEADER,
  LANGUAGE_HEADER,
  STORE_ID_HEADER,
} from '@printful-ts/constants'
import {
  PrintfulVersion,
  PrintfulConfig,
  OAuthScopeValue,
  GetOAuthScopesResponse,
  RequestOptions,
} from '@printful-ts/schemas'
import { deepMerge } from '@printful-ts/utils'

export class PrintfulApiService {
  private _privateToken: string
  private _baseUrl: string
  private _version: PrintfulVersion
  private _api: KyInstance
  private _defaultOptions: RequestOptions

  constructor(config: PrintfulConfig, defaultOptions: RequestOptions = {}) {
    this.setup(config)
    this.configure(defaultOptions)
  }

  protected get privateToken() {
    return this._privateToken
  }

  protected set privateToken(token: string) {
    this._privateToken = z.string().parse(token)
  }

  protected get version() {
    return this._version
  }

  protected set version(version: PrintfulVersion) {
    this._version = PrintfulVersion.parse(version)
  }

  protected get api() {
    return this._api
  }

  protected get defaultOptions() {
    return this._defaultOptions
  }

  protected get baseUrl() {
    return this._baseUrl
  }

  protected set baseUrl(baseUrl: string) {
    this._baseUrl = z.string().url().parse(baseUrl)
  }

  public getBaseUrl(useVersion = true): string {
    if (this.version !== 'v2' || !useVersion) {
      return this.baseUrl
    }
    return `${this.baseUrl}/${this.version}`
  }

  private setup(config: PrintfulConfig) {
    const { privateToken, baseUrl, version } = PrintfulConfig.parse(config)

    this.privateToken = privateToken
    this.baseUrl = baseUrl
    this.version = version
  }

  public async checkScopes(
    scopes: Array<string>,
    options: RequestOptions = {},
  ): Promise<boolean> {
    const requiredScopes = OAuthScopeValue.array().parse(scopes)

    const response = await this.makeRequest(
      'oauth-scopes',
      { ...options, prefixUrl: this.getBaseUrl(false) },
      GetOAuthScopesResponse,
    )

    const allowedScopes = response.data?.map(scope => scope.value)

    return requiredScopes.every(scope => allowedScopes?.includes(scope))
  }

  public configure(options: RequestOptions) {
    const headers = {
      'Content-Type': 'application/json',
    }

    const refineRequest = async (request: Request) => {
      request.headers.set(AUTHORIZATION_HEADER, `Bearer ${this._privateToken}`)
      // TODO: Enable scope check
      // if (Array.isArray(checkScopes)) {
      //   const isAllowed = await this.checkScopes(checkScopes)
      //   if (!isAllowed) {
      //     throw new PrintfulError(
      //       'You are not allowed to perform this action',
      //       PrintfulErrorCode.Enum.FORBIDDEN,
      //     )
      //   }
      // }
    }

    const baseOptions: Options = deepMerge(this._defaultOptions, {
      headers,
      prefixUrl: this.getBaseUrl(),
      parseJson: value => bourne.safeParse(value),
      throwHttpErrors: false,
      hooks: {
        beforeRequest: [refineRequest],
      },
    })

    this._defaultOptions = deepMerge(baseOptions, options)
    this._api = ky.create(this._defaultOptions)

    return this._api
  }

  public async makeRequest<T extends AnyZodObject>(
    endpoint: string,
    options?: RequestOptions,
    schema?: T,
  ): Promise<z.infer<T>> {
    const { validateResponseSchema, ...customOptions } = Object.assign(
      {},
      { ...this._defaultOptions, validateResponseSchema: Boolean(schema) },
      options,
    )

    const afterResponseHook = async (
      _request: Request,
      _options: Options,
      _response: Response,
    ) => {
      if (!schema || !validateResponseSchema || !_response.ok) {
        return _response.json()
      }

      const response = await _response.json()
      const data = schema.parse(response)

      const { headers, status, statusText } = _response

      return HttpResponse.json(data, {
        headers,
        status,
        statusText,
      })
    }

    const headers = new Headers(options?.headers ?? {})

    if (options?.store_id) {
      headers.set(STORE_ID_HEADER, `${options.store_id}`)
    }
    if (options?.locale) {
      headers.set(LANGUAGE_HEADER, options.locale)
    }
    const baseOptions: RequestOptions = deepMerge(customOptions, {
      headers,
      hooks: {
        afterResponse: [afterResponseHook],
      },
    })

    const requestOptions = deepMerge(this._defaultOptions, baseOptions)

    return await this._api<T>(endpoint, requestOptions).json()
  }
}
