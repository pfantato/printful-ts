import { faker } from '@faker-js/faker'

import type { ListCatalogCategoriesResponse } from '@printful-ts/schemas'

import { pagingHateoasLinksMock } from 'tests/mocks/schemas/common'
import { catalogCategoryMock } from 'tests/mocks/schemas/entities'

export const listCatalogCategoriesResponseMock =
  (): ListCatalogCategoriesResponse => ({
    data: faker.helpers.multiple(catalogCategoryMock),
    _links: pagingHateoasLinksMock(),
  })
