import { z } from 'zod'

import { HateoasLink, Localized } from '@printful-ts/schemas/common'
import { VariantImages } from '@printful-ts/schemas/entities'
import { arrayToQueryString } from '@printful-ts/schemas/utils'

export const GetVarianttBlankMockupsSearchParams = Localized(
  z.object({
    mockup_style_ids: z
      .array(z.number())
      .transform(arrayToQueryString)
      .optional(),
    placement: z.string().optional(),
  }),
)
export type GetVarianttBlankMockupsSearchParams = z.infer<
  typeof GetVarianttBlankMockupsSearchParams
>

export const GetVarianttBlankMockupsResponse = z.object({
  data: z.array(VariantImages),
  _links: z.object({
    _self: HateoasLink,
    variant_details: HateoasLink,
  }),
})
export type GetVarianttBlankMockupsResponse = z.infer<
  typeof GetVarianttBlankMockupsResponse
>
