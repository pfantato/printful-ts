import { faker } from '@faker-js/faker'

import type { ListCatalogProductsResponse } from '@printful-ts/schemas'

import { pagingHateoasLinksMock, pagingMock } from 'tests/mocks/schemas/common'
import { productMock } from 'tests/mocks/schemas/entities'

export const listCatalogProductsResponseMock =
  (): ListCatalogProductsResponse => ({
    data: faker.helpers.multiple(productMock),
    paging: pagingMock(),
    _links: pagingHateoasLinksMock(),
  })
