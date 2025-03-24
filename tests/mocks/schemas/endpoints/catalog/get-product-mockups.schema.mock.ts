import { faker } from '@faker-js/faker'

import type {
  GetProductMockupsResponse,
  GetProductMockupsSearchInput,
  GetProductMockupsSearchParams,
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
  mockupStylesMock,
  sellingRegionNameMock,
} from 'tests/mocks/schemas/entities'

export const getProductMockupsSearchInputMock =
  (): GetProductMockupsSearchInput => ({
    placements: faker.helpers.maybe(() =>
      faker.helpers.multiple(faker.lorem.slug, { count: { min: 0, max: 5 } }),
    ),
    selling_region_name: faker.helpers.maybe(sellingRegionNameMock),
    offset: faker.helpers.maybe(offsetMock),
    limit: faker.helpers.maybe(limitMock),
    locale: faker.helpers.maybe(localeMock),
  })

export const getProductMockupsSearchParamsMock =
  (): GetProductMockupsSearchParams => ({
    placements: faker.helpers.maybe(() =>
      faker.helpers.multiple(faker.lorem.slug).join(','),
    ),
    selling_region_name: faker.helpers.maybe(sellingRegionNameMock),
    offset: faker.helpers.maybe(() => offsetMock().toLocaleString()),
    limit: faker.helpers.maybe(() => limitMock().toLocaleString()),
    locale: faker.helpers.maybe(localeMock),
  })

export const getProductMockupsResponseMock = (): GetProductMockupsResponse => ({
  data: faker.helpers.multiple(mockupStylesMock),
  paging: pagingMock(),
  _links: {
    ...pagingHateoasLinksMock(),
    product: hateoasLinkMock(),
  },
})
