import { faker } from '@faker-js/faker'

import {
  SizeType,
  type Measurement,
  type MeasurementValue,
  type ProductSizeGuide,
  type SizeTable,
} from '@printful-ts/schemas'

import { idMock, unitMock } from 'tests/mocks/schemas/common'

export const measurementValueMock = (): MeasurementValue => ({
  size: faker.lorem.word(),
  value: faker.lorem.word(),
})

export const measurementMock = (): Measurement => ({
  type_label: faker.lorem.word(),
  unit: unitMock(),
  values: faker.helpers.multiple(measurementValueMock, {
    count: { min: 1, max: 2 },
  }),
})

export const sizeTypeMock = (): SizeType =>
  faker.helpers.arrayElement(SizeType.options)

export const sizeTableMock = (): SizeTable => ({
  type: sizeTypeMock(),
  unit: unitMock(),
  description: faker.lorem.sentence(),
  image_url: faker.image.url(),
  image_description: faker.lorem.sentence(),
  measurements: faker.helpers.multiple(measurementMock, {
    count: { min: 1, max: 2 },
  }),
})

export const productSizeGuideMock = (): ProductSizeGuide => ({
  catalog_product_id: idMock(),
  available_sizes: faker.helpers.multiple(faker.commerce.productAdjective, {
    count: { min: 1, max: 5 },
  }),
  size_tables: faker.helpers.multiple(sizeTableMock, {
    count: { min: 1, max: 2 },
  }),
})
