import { faker } from '@faker-js/faker'

import type {
  GetProductSizeGuideResponse,
  GetProductSizeGuideSearchInput,
  GetProductSizeGuideSearchParams,
} from '@printful-ts/schemas'

import {
  hateoasLinkMock,
  localeMock,
  unitMock,
} from 'tests/mocks/schemas/common'
import { productSizeGuideMock } from 'tests/mocks/schemas/entities'

export const getProductSizeGuideSearchInputMock =
  (): GetProductSizeGuideSearchInput => ({
    locale: localeMock(),
    unit: faker.helpers.multiple(unitMock, { count: { min: 1, max: 2 } }),
  })

export const getProductSizeGuideSearchParamsMock =
  (): GetProductSizeGuideSearchParams => ({
    locale: faker.helpers.maybe(localeMock),
    unit: faker.helpers
      .multiple(unitMock, { count: { min: 1, max: 2 } })
      .join(','),
  })

export const getProductSizeGuideResponseMock =
  (): GetProductSizeGuideResponse => ({
    data: productSizeGuideMock(),
    _links: {
      self: hateoasLinkMock(),
      product_details: hateoasLinkMock(),
    },
  })
