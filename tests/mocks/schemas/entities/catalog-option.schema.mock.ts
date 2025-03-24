import { faker } from '@faker-js/faker'

import type { CatalogOption } from '@printful-ts/schemas'

import { techniqueKeyMock } from './technique.schema.mock'

export const catalogOptionMock = (): CatalogOption => ({
  name: faker.commerce.product(),
  techniques: faker.helpers.multiple(techniqueKeyMock, {
    count: { min: 1, max: 3 },
  }),
  type: faker.lorem.slug(),
  values: faker.helpers.multiple(faker.commerce.productAdjective, {
    count: { min: 1, max: 2 },
  }),
})
