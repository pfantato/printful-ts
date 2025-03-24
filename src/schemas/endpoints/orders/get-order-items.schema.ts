import { z } from 'zod'

import {
  HateoasLink,
  PagingHateoasLinks,
  PagingSearchInput,
  PagingSearchParams,
  StoreIdSchema,
} from '@printful-ts/schemas/common'
import { OrderItem } from '@printful-ts/schemas/entities'
import {
  StringToArray,
  ArrayToString,
  NumberToString,
} from '@printful-ts/schemas/utils'

export const ListOrderItemsSearchInput = z
  .object({
    type: ArrayToString(z.string()).optional(),
    store_id: NumberToString.optional(),
  })
  .merge(StoreIdSchema)
  .merge(PagingSearchInput)
export type ListOrderItemsSearchInput = z.input<
  typeof ListOrderItemsSearchInput
>
export const ListOrderItemsSearchParams = z
  .object({
    type: StringToArray.optional(),
  })
  .merge(PagingSearchParams)

export type ListOrderItemsSearchParams = z.input<
  typeof ListOrderItemsSearchParams
>

export const ListOrderItemsResponse = z.object({
  data: OrderItem.array(),
  _links: PagingHateoasLinks.merge(
    z.object({
      order: HateoasLink,
    }),
  ),
})
export type ListOrderItemsResponse = z.infer<typeof ListOrderItemsResponse>
