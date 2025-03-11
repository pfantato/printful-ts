import { z } from 'zod'

import {
  Limit,
  Offset,
  Paging,
  PagingHateoasLinks,
  WithStoreId,
} from '@printful-ts/schemas/common'
import { Shipment } from '@printful-ts/schemas/entities'

export const ListOrderShipmentsSearchParams = WithStoreId(
  z.object({
    limit: Limit.optional(),
    offset: Offset.optional(),
  }),
)
export type ListOrderShipmentsSearchParams = z.infer<
  typeof ListOrderShipmentsSearchParams
>

export const ListOrderShipmentsResponse = z.object({
  data: z.array(Shipment),
  paging: Paging,
  _links: PagingHateoasLinks,
})
export type ListOrderShipmentsResponse = z.infer<
  typeof ListOrderShipmentsResponse
>
