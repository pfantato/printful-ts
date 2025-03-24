import { faker } from '@faker-js/faker'

import type {
  ListOrdersResponse,
  ListOrdersSearchInput,
  ListOrdersSearchParams,
} from '@printful-ts/schemas'

import {
  idMock,
  limitMock,
  offsetMock,
  pagingHateoasLinksMock,
  pagingMock,
} from 'tests/mocks/schemas/common'
import { orderSummaryMock } from 'tests/mocks/schemas/entities'

export const listOrdersSearchInputMock = (): ListOrdersSearchInput => ({
  limit: limitMock(),
  offset: offsetMock(),
  store_id: idMock(),
})
export const listOrdersSearchParamsMock = (): ListOrdersSearchParams => ({
  limit: limitMock().toLocaleString(),
  offset: offsetMock().toLocaleString(),
})

export const listOrdersResponseMock = (): ListOrdersResponse => ({
  data: faker.helpers.multiple(orderSummaryMock, {
    count: {
      max: 10,
      min: 1,
    },
  }),
  paging: pagingMock(),
  _links: pagingHateoasLinksMock(),
})
