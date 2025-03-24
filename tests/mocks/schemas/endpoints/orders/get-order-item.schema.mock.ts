import type {
  GetOrderItemResponse,
  OrderItemPathParams,
} from '@printful-ts/schemas'

import {
  externalOrInternalIdMock,
  hateoasLinkMock,
} from 'tests/mocks/schemas/common'
import { orderItemMock } from 'tests/mocks/schemas/entities'

export const orderItemPathParamsMock = (): OrderItemPathParams => ({
  order_id: externalOrInternalIdMock(),
  order_item_id: externalOrInternalIdMock(),
})

export const getOrderItemResponseMock = (): GetOrderItemResponse => ({
  data: orderItemMock(),
  _links: {
    self: hateoasLinkMock(),
    order: hateoasLinkMock(),
    all_items: hateoasLinkMock(),
    shipments: hateoasLinkMock(),
  },
})
