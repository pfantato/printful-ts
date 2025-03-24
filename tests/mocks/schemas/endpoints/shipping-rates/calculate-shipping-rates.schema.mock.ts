import { faker } from '@faker-js/faker'

import type {
  CalculateShippingRatesBody,
  CalculateShippingRatesResponse,
} from '@printful-ts/schemas'

import { idMock, localeMock } from 'tests/mocks/schemas/common'
import {
  addressMock,
  orderItemSourceMock,
  shippingRateCalculationMock,
} from 'tests/mocks/schemas/entities'

export const calculateShippingRatesBodyMock =
  (): CalculateShippingRatesBody => ({
    store_id: idMock(),
    currency: faker.finance.currencyCode(),
    recipient: addressMock(),
    order_items: faker.helpers.multiple(() => ({
      source: orderItemSourceMock(),
      quantity: faker.number.int({ min: 1, max: 5 }),
      catalog_variant_id: idMock(),
    })),
    locale: localeMock(),
  })

export const calculateShippingRatesResponseMock =
  (): CalculateShippingRatesResponse => ({
    data: faker.helpers.multiple(shippingRateCalculationMock),
  })
