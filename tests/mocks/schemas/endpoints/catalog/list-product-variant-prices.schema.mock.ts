import { faker } from '@faker-js/faker'

import type {
  ListProductVariantPricesResponse,
  ListProductVariantPricesSearchParams,
} from '@printful-ts/schemas'

import {
  hateoasLinkMock,
  localeMock,
  pagingHateoasLinksMock,
  pagingMock,
} from 'tests/mocks/schemas/common'
import {
  sellingRegionNameMock,
  variantPriceMock,
} from 'tests/mocks/schemas/entities'

export const listProductVariantPricesSearchParamsMock =
  (): ListProductVariantPricesSearchParams => ({
    currency: faker.helpers.maybe(faker.finance.currencyCode),
    selling_region_name: faker.helpers.maybe(sellingRegionNameMock),
    locale: faker.helpers.maybe(localeMock),
  })

export const listProductVariantPricesResponseMock =
  (): ListProductVariantPricesResponse => ({
    data: faker.helpers.multiple(variantPriceMock),
    paging: pagingMock(),
    _links: {
      ...pagingHateoasLinksMock(),
      product_details: hateoasLinkMock(),
      product_prices: hateoasLinkMock(),
    },
  })
