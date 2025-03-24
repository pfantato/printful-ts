import { faker } from '@faker-js/faker'

import type { Layer } from '@printful-ts/schemas'

import { catalogOptionMock } from './catalog-option.schema.mock'

export const layerMock = (): Layer => ({
  type: faker.word.noun(),
  layer_options: faker.helpers.multiple(catalogOptionMock),
})
