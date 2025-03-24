import { z } from 'zod'

import {
  Paging,
  PagingHateoasLinks,
  PagingSearchInput,
  PagingSearchParams,
  StoreIdSchema,
} from '@printful-ts/schemas/common'
import { Shipment } from '@printful-ts/schemas/entities'

export const ListOrderShipmentsSearchInput =
  PagingSearchInput.merge(StoreIdSchema)

export type ListOrderShipmentsSearchInput = z.input<
  typeof ListOrderShipmentsSearchInput
>

export const ListOrderShipmentsSearchParams = PagingSearchParams

export type ListOrderShipmentsSearchParams = z.input<
  typeof ListOrderShipmentsSearchParams
>

export const ListOrderShipmentsResponse = z.object({
  data: Shipment.array(),
  paging: Paging,
  _links: PagingHateoasLinks,
})
export type ListOrderShipmentsResponse = z.infer<
  typeof ListOrderShipmentsResponse
>
