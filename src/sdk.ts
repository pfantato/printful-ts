import type { PrintfulConfig, RequestOptions } from './schemas'
import {
  CatalogProductsService,
  CountriesService,
  OrdersService,
  PrintfulApiService,
  ShippingRatesService,
  StoresService,
  WarehouseProductsService,
} from './services'

export class PrintfulSDK extends PrintfulApiService {
  public catalog: CatalogProductsService
  public countries: CountriesService
  public orders: OrdersService
  public shippingRates: ShippingRatesService
  public stores: StoresService
  public warehouse: WarehouseProductsService

  constructor(config: PrintfulConfig, defaultOptions?: RequestOptions) {
    super(config, defaultOptions)

    this.catalog = new CatalogProductsService(config)
    this.countries = new CountriesService(config)
    this.orders = new OrdersService(config)
    this.shippingRates = new ShippingRatesService(config)
    this.stores = new StoresService(config)
    this.warehouse = new WarehouseProductsService(config)
  }

  public configure(options?: RequestOptions) {
    super.configure(options)

    this.catalog?.configure(options)
    this.countries?.configure(options)
    // this.files.configure(options)
    this.orders?.configure(options)
    this.shippingRates?.configure(options)
    this.stores?.configure(options)
    this.warehouse?.configure(options)

    return this.api
  }
}
