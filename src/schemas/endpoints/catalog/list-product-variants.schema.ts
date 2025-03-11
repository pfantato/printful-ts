import { z } from 'zod'

import {
  HateoasLink,
  Paging,
  PagingHateoasLinks,
} from '@printful-ts/schemas/common'
import { ProductVariant } from '@printful-ts/schemas/entities'

export const ListProductVariantsResponse = z.object({
  data: z.array(ProductVariant),
  paging: Paging,
  _links: PagingHateoasLinks.extend({
    product_details: HateoasLink,
  }),
})
export type ListProductVariantsResponse = z.infer<
  typeof ListProductVariantsResponse
>
