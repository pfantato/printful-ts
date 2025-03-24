import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  CatalogProductsServiceMock,
  CountriesServiceMock,
  OrdersServiceMock,
  PrintfulSDKMock,
  ShippingRatesServiceMock,
  StoresServiceMock,
  WarehouseProductsServiceMock,
} from 'tests/mocks/services'

describe('PrintfulSDK', () => {
  let sdk: PrintfulSDKMock

  beforeEach(() => {
    sdk = new PrintfulSDKMock()
  })

  it('should initialize with correct services', () => {
    expect(sdk.catalog).toBeInstanceOf(CatalogProductsServiceMock)
    expect(sdk.stores).toBeInstanceOf(StoresServiceMock)
    expect(sdk.warehouse).toBeInstanceOf(WarehouseProductsServiceMock)
    expect(sdk.countries).toBeInstanceOf(CountriesServiceMock)
    expect(sdk.orders).toBeInstanceOf(OrdersServiceMock)
    expect(sdk.shippingRates).toBeInstanceOf(ShippingRatesServiceMock)
  })

  it('should configure services with options', () => {
    const expectedOptions = { timeout: 5000 }

    const spies = [
      'catalog',
      'stores',
      'warehouse',
      'countries',
      'orders',
      'shippingRates',
    ].map(serviceName => {
      const service = sdk[serviceName]
      const spy = vi.spyOn(service, 'configure')

      return {
        service,
        spy,
      }
    })

    sdk.configure(expectedOptions)

    expect(sdk.getDefaultOptions()).toEqual(
      expect.objectContaining(expectedOptions),
    )

    spies.forEach(({ spy, service }) => {
      expect(spy).toHaveBeenCalledWith(expectedOptions)
      expect(service.defaultOptions).toEqual(
        expect.objectContaining(expectedOptions),
      )
    })
  })
})
