import { faker } from '@faker-js/faker'

import type {
  ListWarehouseProductsResponse,
  ListWarehouseProductsSearchInput,
} from '@printful-ts/schemas'

import {
  idMock,
  limitMock,
  offsetMock,
  pagingHateoasLinksMock,
  pagingMock,
} from 'tests/mocks/schemas/common'
import { warehouseProductMock } from 'tests/mocks/schemas/entities'

export const listWarehouseProductsSearchInputMock =
  (): ListWarehouseProductsSearchInput => ({
    store_id: idMock(),
    filter: faker.lorem.word(),
    limit: limitMock(),
    offset: offsetMock(),
  })

export const listWarehouseProductsResponseMock =
  (): ListWarehouseProductsResponse => ({
    data: faker.helpers.multiple(warehouseProductMock, {
      count: { min: 1, max: 20 },
    }),
    paging: pagingMock(),
    _links: pagingHateoasLinksMock(),
  })
