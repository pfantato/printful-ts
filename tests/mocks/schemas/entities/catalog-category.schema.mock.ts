import { faker } from '@faker-js/faker'

import type { CatalogCategory } from '@printful-ts/schemas'

import { idMock, hateoasLinkMock } from 'tests/mocks/schemas/common'

export const catalogCategoryMock = (): CatalogCategory => ({
  id: idMock(),
  parent_id: faker.helpers.maybe(idMock),
  image_url: faker.internet.url(),
  title: faker.lorem.words(),
  _links: {
    self: hateoasLinkMock(),
  },
})
