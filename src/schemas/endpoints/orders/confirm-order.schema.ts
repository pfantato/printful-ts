import { z } from 'zod'

import { HateoasLink } from '@printful-ts/schemas/common'
import { Order } from '@printful-ts/schemas/entities'

export const ConfirmOrderResponse = z.object({
  data: Order,
  _links: z.object({
    _self: HateoasLink,
    order: HateoasLink,
    order_items: HateoasLink,
    shipments: HateoasLink,
  }),
})
export type ConfirmOrderResponse = z.infer<typeof ConfirmOrderResponse>
