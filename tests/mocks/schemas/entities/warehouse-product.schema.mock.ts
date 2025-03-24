import { faker } from '@faker-js/faker'

import {
  WarehouseProductStatus,
  type Dimensions,
  type StockLocation,
  type WarehouseProduct,
  type WarehouseProductVariant,
} from '@printful-ts/schemas'

import {
  hateoasLinkMock,
  idMock,
  measurementSystemMock,
} from 'tests/mocks/schemas/common'

export const stockLocationMock = (): StockLocation => ({
  facility: faker.word.sample(),
  stocked: faker.number.int({ min: 0, max: 1000 }),
  available: faker.number.int({ min: 0, max: 1000 }),
})

export const dimensionsMock = (): Dimensions => ({
  measurement_system: measurementSystemMock(),
  width: faker.number.int({ min: 100, max: 1000 }),
  height: faker.number.int({ min: 100, max: 1000 }),
  length: faker.number.int({ min: 100, max: 1000 }),
  weight: faker.number.int({ min: 100, max: 1000 }),
})

export const warehouseProductStatusMock = (): WarehouseProductStatus =>
  faker.helpers.arrayElement(WarehouseProductStatus.options)

export const warehouseProductVariantMock = (): WarehouseProductVariant => ({
  id: idMock(),
  name: faker.commerce.productName(),
  sku: faker.string.nanoid(),
  image_url: faker.image.url(),
  retail_price: faker.commerce.price(),
  quantity: faker.number.int({ min: 1, max: 100 }),
  stock_location: faker.helpers.multiple(stockLocationMock),
  dimensions: dimensionsMock(),
  _links: {
    self: hateoasLinkMock(),
  },
})

export const warehouseProductMock = (): WarehouseProduct => ({
  id: idMock(),
  name: faker.commerce.productName(),
  status: warehouseProductStatusMock(),
  currency: faker.finance.currencyCode(),
  image_url: faker.image.url(),
  variants: faker.helpers.multiple(warehouseProductVariantMock),
  _links: {
    self: hateoasLinkMock(),
    warehouse_variants: hateoasLinkMock(),
  },
})
