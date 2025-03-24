import { BASE_URL } from 'tests/mocks/constants'

import { catalogHandlers } from './catalog-service.handlers'
import { countriesHandlers } from './countries-service.handlers'
import { oauthHandlers } from './oauth-service.handlers'
import { ordersHandlers } from './orders-service.handlers'
import { shippingRatesHandlers } from './shipping-rates-service.handlers'
import { storeHandlers } from './store-service.handlers'
import { warehouseProductsHandlers } from './warehouse-products-service.handlers'

export const generateHandlers = (baseUrl = BASE_URL) => [
  ...catalogHandlers(baseUrl),
  ...countriesHandlers(baseUrl),
  ...oauthHandlers(baseUrl),
  ...ordersHandlers(baseUrl),
  ...shippingRatesHandlers(baseUrl),
  ...storeHandlers(baseUrl),
  ...warehouseProductsHandlers(baseUrl),
]
