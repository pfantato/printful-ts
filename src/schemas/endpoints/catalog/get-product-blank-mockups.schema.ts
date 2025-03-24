import { z } from 'zod'

import {
  ColorValue,
  HateoasLink,
  InternalId,
  Paging,
  WithLocale,
} from '@printful-ts/schemas/common'
import { VariantImages } from '@printful-ts/schemas/entities'
import {
  ArrayToString,
  StringToArray,
  StringToNumber,
} from '@printful-ts/schemas/utils'

export const GetProductBlankMockupsSearchInput = z
  .object({
    mockup_style_ids: ArrayToString(InternalId).optional(),
    colors: ArrayToString(ColorValue).optional(),
    placement: z.string().optional(),
  })
  .merge(WithLocale)
export type GetProductBlankMockupsSearchInput = z.input<
  typeof GetProductBlankMockupsSearchInput
>

export const GetProductBlankMockupsSearchParams = z
  .object({
    mockup_style_ids: StringToArray.pipe(StringToNumber)
      .pipe(InternalId)
      .optional(),
    colors: StringToArray.pipe(ColorValue).optional(),
    placement: z.string().optional(),
  })
  .merge(WithLocale)
export type GetProductBlankMockupsSearchParams = z.input<
  typeof GetProductBlankMockupsSearchParams
>

export const GetProductBlankMockupsResponse = z.object({
  data: VariantImages.array(),
  paging: Paging,
  _links: z.object({
    self: HateoasLink,
    product_details: HateoasLink,
  }),
})
export type GetProductBlankMockupsResponse = z.infer<
  typeof GetProductBlankMockupsResponse
>
