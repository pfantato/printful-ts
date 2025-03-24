import { faker } from '@faker-js/faker'

import type { Customization, Gift, PackingSlip } from '@printful-ts/schemas'

export const giftMock = (): Gift => ({
  subject: faker.lorem.words(),
  message: faker.lorem.sentence(),
})

export const packingSlipMock = (): PackingSlip => ({
  email: faker.internet.email(),
  phone: faker.phone.number(),
  message: faker.lorem.sentence(),
  logo_url: faker.internet.url(),
  store_name: faker.company.name(),
  custom_order_id: faker.helpers.replaceSymbols('##########'),
})

export const customizationMock = (): Customization => ({
  gift: giftMock(),
  packing_slip: packingSlipMock(),
})
