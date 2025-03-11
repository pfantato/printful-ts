import type { Options } from 'ky'

import { SHIPPING_RATES_RESOURCE } from '@printful-ts/constants'
import {
  CalculateShippingRatesBody,
  CalculateShippingRatesResponse,
} from '@printful-ts/schemas'

import { PrintfulApiService } from './printful-api.service'

export class ShippingRateService extends PrintfulApiService {
  async calculateShippingRates(
    body: CalculateShippingRatesBody,
    options: Options = {},
  ) {
    const { store_id, locale, ...json } = CalculateShippingRatesBody.parse(body)

    return await this.request(
      SHIPPING_RATES_RESOURCE,
      {
        ...options,
        locale,
        store_id,
        json,
      },
      CalculateShippingRatesResponse,
    )
  }
}
