import { z } from 'zod'

import {
  HateoasLink,
  Limit,
  Offset,
  Paging,
  PagingHateoasLinks,
  Localized,
} from '@printful-ts/schemas/common'
import {
  MockupTemplates,
  SellingRegionName,
} from '@printful-ts/schemas/entities'
import {
  arrayToQueryString,
  numberToQueryString,
} from '@printful-ts/schemas/utils'

export const GetProductMockupTemplatesSearchParams = Localized(
  z.object({
    placements: z.array(z.string()).transform(arrayToQueryString).optional(),
    selling_region_name: SellingRegionName.default(
      SellingRegionName.Enum.worldwide,
    ).optional(),
    offset: Offset.transform(numberToQueryString).optional(),
    limit: Limit.transform(numberToQueryString).optional(),
  }),
)
export type GetProductMockupTemplatesSearchParams = z.infer<
  typeof GetProductMockupTemplatesSearchParams
>

export const GetProductMockupTemplatesResponse = z.object({
  data: z.array(MockupTemplates),
  paging: Paging,
  _links: PagingHateoasLinks.extend({
    product: HateoasLink,
  }),
})
export type GetProductMockupTemplatesResponse = z.infer<
  typeof GetProductMockupTemplatesResponse
>
