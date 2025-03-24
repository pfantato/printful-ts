import { faker } from '@faker-js/faker'

import type {
  ListOrderShipmentsResponse,
  ListOrderShipmentsSearchInput,
  ListOrderShipmentsSearchParams,
} from '@printful-ts/schemas'

import {
  idMock,
  limitMock,
  offsetMock,
  pagingHateoasLinksMock,
  pagingMock,
} from 'tests/mocks/schemas/common'
import { shipmentMock } from 'tests/mocks/schemas/entities'

export const listOrderShipmentsSearchInputMock =
  (): ListOrderShipmentsSearchInput => ({
    limit: limitMock(),
    offset: offsetMock(),
    store_id: idMock(),
  })

export const listOrderShipmentsSearchParamsMock =
  (): ListOrderShipmentsSearchParams => ({
    limit: limitMock().toString(),
    offset: offsetMock().toString(),
  })
export const listOrderShipmentsResponseMock =
  (): ListOrderShipmentsResponse => ({
    data: faker.helpers.multiple(shipmentMock),
    paging: pagingMock(),
    _links: pagingHateoasLinksMock(),
  })
