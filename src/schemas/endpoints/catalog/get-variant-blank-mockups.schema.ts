import { z } from 'zod'

import {
  HateoasLink,
  InternalId,
  WithLocale,
} from '@printful-ts/schemas/common'
import { VariantImages } from '@printful-ts/schemas/entities'
import { ArrayToString, StringToArray } from '@printful-ts/schemas/utils'

export const GetVariantBlankMockupsSearchInput = z
  .object({
    mockup_style_ids: ArrayToString(InternalId).optional(),
    placement: z.string().optional(),
  })
  .merge(WithLocale)
export type GetVariantBlankMockupsSearchInput = z.input<
  typeof GetVariantBlankMockupsSearchInput
>

export const GetVariantBlankMockupsSearchParams = z
  .object({
    mockup_style_ids: StringToArray.pipe(InternalId.array()).optional(),
    placement: z.string().optional(),
  })
  .merge(WithLocale)

export type GetVariantBlankMockupsSearchParams = z.input<
  typeof GetVariantBlankMockupsSearchParams
>

export const GetVariantBlankMockupsResponse = z.object({
  data: VariantImages.array(),
  _links: z.object({
    self: HateoasLink,
    variant_details: HateoasLink,
  }),
})
export type GetVariantBlankMockupsResponse = z.infer<
  typeof GetVariantBlankMockupsResponse
>
