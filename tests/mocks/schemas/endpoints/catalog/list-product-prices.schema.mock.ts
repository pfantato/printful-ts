import { faker } from '@faker-js/faker'

import type {
  ListProductPricesResponse,
  ListProductPricesSearchParams,
} from '@printful-ts/schemas'

import {
  hateoasLinkMock,
  localeMock,
  pagingHateoasLinksMock,
  pagingMock,
} from 'tests/mocks/schemas/common'
import {
  productPriceMock,
  sellingRegionNameMock,
} from 'tests/mocks/schemas/entities'

export const listProductPricesSearchParamsMock =
  (): ListProductPricesSearchParams => ({
    selling_region_name: sellingRegionNameMock(),
    currency: faker.finance.currencyCode(),
    locale: localeMock(),
  })

export const listProductPricesResponseMock = (): ListProductPricesResponse => ({
  data: faker.helpers.multiple(productPriceMock, {
    count: { min: 1, max: 15 },
  }),
  paging: pagingMock(),
  _links: {
    ...pagingHateoasLinksMock(),
    product_details: hateoasLinkMock(),
  },
})
