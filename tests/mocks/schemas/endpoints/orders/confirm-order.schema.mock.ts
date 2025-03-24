import type { ConfirmOrderResponse } from '@printful-ts/schemas'

import { hateoasLinkMock } from 'tests/mocks/schemas/common'
import { orderMock } from 'tests/mocks/schemas/entities'

export const confirmOrderResponseMock = (): ConfirmOrderResponse => ({
  data: orderMock(),
  _links: {
    _self: hateoasLinkMock(),
    order: hateoasLinkMock(),
    order_items: hateoasLinkMock(),
    shipments: hateoasLinkMock(),
  },
})
