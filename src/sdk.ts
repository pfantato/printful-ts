import type { PrintfulConfig, RequestOptions } from './schemas'
import {
  // ApprovalSheetsService,
  CatalogProductsService,
  CountriesService,
  // FilesService,
  // MockupGeneratorService,
  OrdersService,
  PrintfulApiService,
  ShippingRatesService,
  StoresService,
  WarehouseProductsService,
  // WebhooksService,
} from './services'

export class PrintfulSDK extends PrintfulApiService {
  // public approvalSheets: ApprovalSheetsService
  public catalog: CatalogProductsService
  public countries: CountriesService
  // public files: FilesService
  // public mockupGenerator: MockupGeneratorService
  public orders: OrdersService
  public shippingRates: ShippingRatesService
  public stores: StoresService
  public warehouse: WarehouseProductsService
  // public webhooks: WebhooksService

  constructor(config: PrintfulConfig, defaultOptions?: RequestOptions) {
    super(config, defaultOptions)

    // this.approvalSheets = new ApprovalSheetsService(config)
    this.catalog = new CatalogProductsService(config)
    this.countries = new CountriesService(config)
    // this.files = new FilesService(config)
    // this.mockupGenerator = new MockupGeneratorService(config)
    this.orders = new OrdersService(config)
    this.shippingRates = new ShippingRatesService(config)
    this.stores = new StoresService(config)
    this.warehouse = new WarehouseProductsService(config)
    // this.webhooks = new WebhooksService(config)
  }

  public configure(options?: RequestOptions) {
    super.configure(options)

    // this.approvalSheets.configure(options)
    this.catalog?.configure(options)
    this.countries?.configure(options)
    // this.files.configure(options)
    // this.mockupGenerator.configure(options)
    this.orders?.configure(options)
    this.shippingRates?.configure(options)
    this.stores?.configure(options)
    this.warehouse?.configure(options)
    // this.webhooks.configure(options)

    return this.api
  }
}
