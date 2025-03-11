import { z } from 'zod'

import {
  ColorValue,
  HateoasLink,
  Paging,
  Localized,
} from '@printful-ts/schemas/common'
import { VariantImages } from '@printful-ts/schemas/entities'
import { arrayToQueryString } from '@printful-ts/schemas/utils'

export const GetProductBlankMockupsSearchParams = Localized(
  z.object({
    mockup_style_ids: z
      .array(z.number())
      .transform(arrayToQueryString)
      .optional(),
    colors: z.array(ColorValue).transform(arrayToQueryString).optional(),
    placement: z.string().optional(),
  }),
)
export type GetProductBlankMockupsSearchParams = z.infer<
  typeof GetProductBlankMockupsSearchParams
>

export const GetProductBlankMockupsResponse = z.object({
  data: z.array(VariantImages),
  paging: Paging,
  _links: z.object({
    _self: HateoasLink,
    product_details: HateoasLink,
  }),
})
export type GetProductBlankMockupsResponse = z.infer<
  typeof GetProductBlankMockupsResponse
>
