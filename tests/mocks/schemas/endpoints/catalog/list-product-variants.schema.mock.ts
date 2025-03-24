import { faker } from '@faker-js/faker'

import type { ListProductVariantsResponse } from '@printful-ts/schemas'

import {
  hateoasLinkMock,
  pagingHateoasLinksMock,
  pagingMock,
} from 'tests/mocks/schemas/common'
import { productVariantMock } from 'tests/mocks/schemas/entities'

export const listProductVariantsResponseMock =
  (): ListProductVariantsResponse => ({
    data: faker.helpers.multiple(productVariantMock),
    paging: pagingMock(),
    _links: { ...pagingHateoasLinksMock(), product_details: hateoasLinkMock() },
  })
