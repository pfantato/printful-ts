import { faker } from '@faker-js/faker'

import {
  CalculationStatus,
  type BaseRetailCosts,
  type Costs,
  type RetailCosts,
} from '@printful-ts/schemas'

export const calculationStatusMock = (): CalculationStatus =>
  faker.helpers.arrayElement(CalculationStatus.options)

export const costsMock = (): Costs => ({
  calculation_status: calculationStatusMock(),
  currency: faker.helpers.maybe(faker.finance.currencyCode),
  subtotal: faker.finance.amount(),
  discount: faker.finance.amount(),
  shipping: faker.finance.amount(),
  digitization: faker.finance.amount(),
  additional_fee: faker.finance.amount(),
  fulfillment_fee: faker.finance.amount(),
  total: faker.finance.amount(),
  retail_delivery_fee: faker.finance.amount(),
  vat: faker.finance.amount(),
  tax: faker.finance.amount(),
})

export const baseRetailCostsMock = (): BaseRetailCosts => ({
  currency: faker.finance.currencyCode(),
  discount: faker.finance.amount(),
  shipping: faker.finance.amount(),
  tax: faker.finance.amount(),
})

export const retailCostsMock = (): RetailCosts => ({
  ...baseRetailCostsMock(),
  calculation_status: calculationStatusMock(),
  subtotal: faker.finance.amount(),
  vat: faker.finance.amount(),
  total: faker.finance.amount(),
})
