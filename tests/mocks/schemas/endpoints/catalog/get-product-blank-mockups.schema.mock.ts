import { faker } from '@faker-js/faker'

import type {
  GetProductBlankMockupsResponse,
  GetProductBlankMockupsSearchInput,
  GetProductBlankMockupsSearchParams,
} from '@printful-ts/schemas'

import {
  colorValueMock,
  hateoasLinkMock,
  idMock,
  localeMock,
  pagingMock,
} from 'tests/mocks/schemas/common'
import { variantImagesMock } from 'tests/mocks/schemas/entities'

export const getProductBlankMockupsSearchInputMock =
  (): GetProductBlankMockupsSearchInput => ({
    colors: faker.helpers.maybe(() => faker.helpers.multiple(colorValueMock)),
    locale: faker.helpers.maybe(localeMock),
    mockup_style_ids: faker.helpers.multiple(idMock),
    placement: faker.lorem.slug(),
  })
export const getProductBlankMockupsSearchParamsMock =
  (): GetProductBlankMockupsSearchParams => {
    const { mockup_style_ids, colors, locale, placement } =
      getProductBlankMockupsSearchInputMock()

      return {
      mockup_style_ids: mockup_style_ids?.join(','),
      colors: colors?.join(','),
      locale: locale,
      placement: placement,
    }
  }

export const getProductBlankMockupsResponseMock =
  (): GetProductBlankMockupsResponse => ({
    data: faker.helpers.multiple(variantImagesMock),
    paging: pagingMock(),
    _links: {
      self: hateoasLinkMock(),
      product_details: hateoasLinkMock(),
    },
  })
