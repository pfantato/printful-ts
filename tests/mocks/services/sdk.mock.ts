import type { PrintfulConfig, RequestOptions } from '@printful-ts/schemas'
import { PrintfulSDK } from '@printful-ts/sdk'
import { applyMixins } from '@printful-ts/utils'

import { CatalogProductsServiceMock } from './catalog.service.mock'
import { CountriesServiceMock } from './countries.service.mock'
import { OrdersServiceMock } from './orders.service.mock'
import { ShippingRatesServiceMock } from './shipping-rates.service.mock'
import { StoresServiceMock } from './stores.service.mock'
import { WarehouseProductsServiceMock } from './warehouse-products.service.mock'
import { PrintfulApiServiceMock } from './printful-api.service.mock'

export interface PrintfulSDKMock extends PrintfulSDK, PrintfulApiServiceMock {}

export class PrintfulSDKMock
  extends PrintfulSDK
  implements PrintfulApiServiceMock, PrintfulApiServiceMock
{
  constructor(
    config: PrintfulConfig = { privateToken: 'fake-token' },
    defaultOptions?: RequestOptions,
  ) {
    super(config, defaultOptions)

    this.catalog = new CatalogProductsServiceMock(config, defaultOptions)
    this.countries = new CountriesServiceMock(config, defaultOptions)
    this.orders = new OrdersServiceMock(config, defaultOptions)
    this.shippingRates = new ShippingRatesServiceMock(config, defaultOptions)
    this.stores = new StoresServiceMock(config, defaultOptions)
    this.warehouse = new WarehouseProductsServiceMock(config, defaultOptions)
  }

  public configure(options?: RequestOptions) {
    this.catalog.configure(options)
    this.countries.configure(options)
    this.orders.configure(options)
    this.shippingRates.configure(options)
    this.stores.configure(options)
    this.warehouse.configure(options)

    return this.api
  }
}

applyMixins(PrintfulSDKMock, [PrintfulSDK, PrintfulApiServiceMock])
