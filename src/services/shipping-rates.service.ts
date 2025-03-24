import type { Options } from 'ky'

import { PrintfulApiResources } from '@printful-ts/constants'
import {
  CalculateShippingRatesBody,
  CalculateShippingRatesResponse,
} from '@printful-ts/schemas'

import { PrintfulApiService } from './printful-api.service'

export class ShippingRatesService extends PrintfulApiService {
  async calculateShippingRates(
    body: CalculateShippingRatesBody,
    options: Options = {},
  ) {
    const { store_id, locale, ...json } = CalculateShippingRatesBody.parse(body)

    return await this.makeRequest(
      PrintfulApiResources.SHIPPING_RATES,
      {
        ...options,
        method: 'post',
        locale,
        store_id,
        json,
      },
      CalculateShippingRatesResponse,
    )
  }
}
