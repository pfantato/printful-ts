import { faker } from '@faker-js/faker'
import type { z } from 'zod'

import type {
  ListOrderItemsResponse,
  ListOrderItemsSearchInput,
  ListOrderItemsSearchParams,
} from '@printful-ts/schemas'

import {
  hateoasLinkMock,
  idMock,
  limitMock,
  offsetMock,
  pagingHateoasLinksMock,
} from 'tests/mocks/schemas/common'
import { orderItemMock } from 'tests/mocks/schemas/entities'

export const listOrderItemsSearchInputMock = (): z.input<
  typeof ListOrderItemsSearchInput
> => ({
  store_id: idMock(),
  type: faker.helpers.multiple(faker.lorem.word),
  limit: faker.helpers.maybe(limitMock),
  offset: faker.helpers.maybe(offsetMock),
})

export const listOrderItemsSearchParamsMock =
  (): ListOrderItemsSearchParams => ({
    type: faker.helpers
      .multiple(faker.lorem.word, { count: { min: 1, max: 3 } })
      .join(','),
    limit: limitMock().toLocaleString(),
    offset: offsetMock().toLocaleString(),
  })

export const listOrderItemsResponseMock = (): ListOrderItemsResponse => ({
  data: faker.helpers.multiple(orderItemMock),
  _links: {
    ...pagingHateoasLinksMock(),
    order: hateoasLinkMock(),
  },
})
