import { z } from 'zod'

import {
  HateoasLink,
  Limit,
  Offset,
  Paging,
  PagingHateoasLinks,
  Localized,
} from '@printful-ts/schemas/common'
import { MockupStyles, SellingRegionName } from '@printful-ts/schemas/entities'
import {
  arrayToQueryString,
  numberToQueryString,
} from '@printful-ts/schemas/utils'

export const GetProductMockupsSearchParams = Localized(
  z.object({
    placements: z.array(z.string()).transform(arrayToQueryString).optional(),
    selling_region_name: SellingRegionName.default(
      SellingRegionName.Enum.worldwide,
    ).optional(),
    offset: Offset.transform(numberToQueryString).optional(),
    limit: Limit.transform(numberToQueryString).optional(),
  }),
)
export type GetProductMockupsSearchParams = z.infer<
  typeof GetProductMockupsSearchParams
>

export const GetProductMockupsResponse = z.object({
  data: z.array(MockupStyles),
  paging: Paging,
  _links: PagingHateoasLinks.extend({
    product: HateoasLink,
  }),
})
export type GetProductMockupsResponse = z.infer<
  typeof GetProductMockupsResponse
>
