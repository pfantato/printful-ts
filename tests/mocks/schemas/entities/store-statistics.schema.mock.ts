import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

import {
  ReportType,
  type CostsByAmountValue,
  type CostsByProductValue,
  type CostsByVariantValue,
  type RelativeCosts,
  type SalesAndCostsSummaryValue,
  type SalesAndCostsValue,
  type StoreStatistics,
} from '@printful-ts/schemas'

import { idMock } from 'tests/mocks/schemas/common'

export const reportTypeMock = (): ReportType =>
  faker.helpers.arrayElement(ReportType.options)

export const salesAndCostsValueMock = (): SalesAndCostsValue => ({
  date: dayjs(faker.date.anytime()).format('YYYY-MM-DD'),
  sales: faker.commerce.price(),
  fulfillment: faker.commerce.price(),
  profit: faker.commerce.price(),
  sales_discount: faker.commerce.price(),
  fulfillment_discount: faker.commerce.price(),
  sales_shipping: faker.commerce.price(),
  fulfillment_shipping: faker.commerce.price(),
})

export const salesAndCostsSummaryValueMock = (): SalesAndCostsSummaryValue => {
  return {
    date: dayjs(faker.date.anytime()).format('YYYY-MM-DD'),
    order_count: faker.number.int({ min: 5, max: 10 }),
    costs: faker.commerce.price(),
    profit: faker.commerce.price(),
  }
}

export const relativeCostsMock = (): RelativeCosts => ({
  value: faker.commerce.price(),
  relative_difference: faker.commerce.price(),
})

export const costsByAmountValueMock = (): CostsByAmountValue => ({
  date: dayjs(faker.date.anytime()).format('YYYY-MM-DD'),
  product_amount: faker.commerce.price(),
  digitization: faker.commerce.price(),
  branding: faker.commerce.price(),
  vat: faker.commerce.price(),
  sales_tax: faker.commerce.price(),
  shipping: faker.commerce.price(),
  discount: faker.commerce.price(),
  total: faker.commerce.price(),
})

export const costsByProductValueMock = (): CostsByProductValue => ({
  product_id: idMock(),
  product_name: faker.commerce.productName(),
  fulfillment: faker.commerce.price(),
  sales: faker.commerce.price(),
  quantity: faker.number.int({ min: 1, max: 100 }),
})

export const costsByVariantValueMock = (): CostsByVariantValue => ({
  product_id: idMock(),
  variant_id: idMock(),
  variant_name: faker.commerce.productName(),
  fulfillment: faker.commerce.price(),
  sales: faker.commerce.price(),
  quantity: faker.number.int({ min: 1, max: 100 }),
})

export const storeStatisticsMock = (): StoreStatistics => ({
  store_id: idMock(),
  currency: faker.finance.currencyCode(),
  sales_and_costs: faker.helpers.multiple(salesAndCostsValueMock),
  sales_and_costs_summary: faker.helpers.multiple(
    salesAndCostsSummaryValueMock,
  ),
  printful_costs: relativeCostsMock(),
  profit: relativeCostsMock(),
  total_paid_orders: relativeCostsMock(),
  costs_by_amount: faker.helpers.multiple(costsByAmountValueMock),
  costs_by_product: faker.helpers.multiple(costsByProductValueMock),
  costs_by_variant: faker.helpers.multiple(costsByVariantValueMock),
  average_fulfillment_time: relativeCostsMock(),
})
