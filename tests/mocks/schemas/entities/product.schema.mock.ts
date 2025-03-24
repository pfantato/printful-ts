import { faker } from '@faker-js/faker'

import type { Product } from '@printful-ts/schemas'

import { colorMock, hateoasLinkMock, idMock } from 'tests/mocks/schemas/common'

import { catalogOptionMock } from './catalog-option.schema.mock'
import { designPlacementMock } from './design-placements.schema.mock'
import { techniqueMock } from './technique.schema.mock'

export const productMock = (): Product => ({
  id: idMock(),
  main_category_id: idMock(),
  type: faker.lorem.word(),
  name: faker.commerce.productName(),
  brand: faker.company.name(),
  model: faker.commerce.productMaterial(),
  image: faker.image.url(),
  variant_count: faker.number.int({ min: 0, max: 100 }),
  is_discontinued: faker.datatype.boolean(),
  description: faker.commerce.productDescription(),
  sizes: faker.helpers.multiple(faker.commerce.productAdjective, {
    count: { min: 1, max: 3 },
  }),
  colors: faker.helpers.multiple(colorMock, {
    count: { min: 1, max: 5 },
  }),
  techniques: faker.helpers.multiple(techniqueMock, {
    count: { min: 1, max: 3 },
  }),
  placements: faker.helpers.multiple(designPlacementMock, {
    count: { min: 1, max: 3 },
  }),
  product_options: faker.helpers.multiple(catalogOptionMock, {
    count: { min: 1, max: 5 },
  }),
  _links: {
    self: hateoasLinkMock(),
    variants: hateoasLinkMock(),
    categories: hateoasLinkMock(),
    product_prices: hateoasLinkMock(),
    product_sizes: hateoasLinkMock(),
    product_images: hateoasLinkMock(),
    availability: hateoasLinkMock(),
  },
})
