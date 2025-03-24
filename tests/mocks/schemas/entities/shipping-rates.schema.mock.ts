import { faker } from '@faker-js/faker'
import dayjs from 'dayjs'

import type {
  ShippingRateCalculation,
  ShippingRateShipment,
  ShippingRateShipmentItems,
} from '@printful-ts/schemas'

import { idMock } from 'tests/mocks/schemas/common'

export const shippingRateShimpentItemsMock = (): ShippingRateShipmentItems => ({
  catalog_variant_id: idMock(),
  quantity: faker.number.int({ min: 0, max: 100 }),
})

export const shippingRateShipmentMock = (): ShippingRateShipment => ({
  departure_country: faker.location.countryCode(),
  shipment_items: faker.helpers.multiple(shippingRateShimpentItemsMock),
  custom_fees_possible: faker.datatype.boolean(),
})

export const shippingRateCalculationMock = (): ShippingRateCalculation => {
  const min_delivery_date = dayjs(faker.date.soon()).format('YYYY-MM-DD')
  const max_delivery_date = dayjs(
    faker.date.soon({ refDate: min_delivery_date }),
  ).format('YYYY-MM-DD')
  const min_delivery_days = dayjs().diff(min_delivery_date, 'days')
  const max_delivery_days = dayjs().diff(max_delivery_date, 'days')

  return {
    shipping: faker.lorem.word(),
    shipping_method_name: faker.lorem.word(),
    rate: faker.finance.amount(),
    currency: faker.finance.currencyCode(),
    min_delivery_days,
    max_delivery_days,
    min_delivery_date,
    max_delivery_date,
    shipments: faker.helpers.multiple(shippingRateShipmentMock),
  }
}
