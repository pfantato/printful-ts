import type { PrintfulConfig, RequestOptions } from '@printful-ts/schemas'
import { OrdersService } from '@printful-ts/services'
import { applyMixins } from '@printful-ts/utils'

import { PrintfulApiServiceMock } from './printful-api.service.mock'

export interface OrdersServiceMock
  extends PrintfulApiServiceMock,
    OrdersService {}

export class OrdersServiceMock
  extends PrintfulApiServiceMock
  implements PrintfulApiServiceMock, OrdersService
{
  constructor(config?: PrintfulConfig, options?: RequestOptions) {
    super(config, options)
  }
}

applyMixins(OrdersServiceMock, [PrintfulApiServiceMock, OrdersService])
