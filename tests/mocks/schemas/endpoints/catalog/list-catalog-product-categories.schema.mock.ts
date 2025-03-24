import { faker } from '@faker-js/faker'

import type {
  ListProductCategoriesResponse,
  ListProductCategoriesSearchParams,
} from '@printful-ts/schemas'

import {
  hateoasLinkMock,
  pagingHateoasLinksMock,
  pagingMock,
} from 'tests/mocks/schemas/common'
import {
  catalogCategoryMock,
  sellingRegionNameMock,
} from 'tests/mocks/schemas/entities'

export const listProductCategoriesSearchParamsMock =
  (): ListProductCategoriesSearchParams => ({
    selling_region_name: faker.helpers.maybe(sellingRegionNameMock),
  })

export const listProductCategoriesResponseMock =
  (): ListProductCategoriesResponse => ({
    data: faker.helpers.multiple(catalogCategoryMock),
    paging: pagingMock(),
    _links: {
      ...pagingHateoasLinksMock(),
      all_categories: hateoasLinkMock(),
    },
  })
