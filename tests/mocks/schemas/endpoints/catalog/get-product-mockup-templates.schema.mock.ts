import { faker } from '@faker-js/faker'

import type {
  GetProductMockupTemplatesResponse,
  GetProductMockupTemplatesSearchInput,
  GetProductMockupTemplatesSearchParams,
} from '@printful-ts/schemas'

import {
  hateoasLinkMock,
  limitMock,
  localeMock,
  offsetMock,
  pagingHateoasLinksMock,
  pagingMock,
} from 'tests/mocks/schemas/common'
import {
  mockupTemplatesMock,
  sellingRegionNameMock,
} from 'tests/mocks/schemas/entities'

export const getProductMockupTemplatesSearchInputMock =
  (): GetProductMockupTemplatesSearchInput => ({
    placements: faker.helpers.maybe(() =>
      faker.helpers.multiple(faker.lorem.slug, { count: { min: 0, max: 4 } }),
    ),
    selling_region_name: faker.helpers.maybe(sellingRegionNameMock),
    offset: faker.helpers.maybe(offsetMock),
    limit: faker.helpers.maybe(limitMock),
    locale: faker.helpers.maybe(localeMock),
  })

export const getProductMockupTemplatesSearchParamsMock =
  (): GetProductMockupTemplatesSearchParams => ({
    placements: faker.helpers.maybe(() =>
      faker.helpers.multiple(faker.lorem.slug).join(','),
    ),
    selling_region_name: faker.helpers.maybe(sellingRegionNameMock),
    offset: faker.helpers.maybe(() => offsetMock().toLocaleString()),
    limit: faker.helpers.maybe(() => limitMock().toLocaleString()),
    locale: faker.helpers.maybe(localeMock),
  })

export const getProductMockupTemplatesResponseMock =
  (): GetProductMockupTemplatesResponse => ({
    data: faker.helpers.multiple(mockupTemplatesMock),
    paging: pagingMock(),
    _links: {
      ...pagingHateoasLinksMock(),
      product: hateoasLinkMock(),
    },
  })
