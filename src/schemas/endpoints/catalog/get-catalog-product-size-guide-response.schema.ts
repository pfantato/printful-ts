import { z } from 'zod'

import { HateoasLink, Unit, WithLocale } from '@printful-ts/schemas/common'
import { ProductSizeGuide } from '@printful-ts/schemas/entities'
import { ArrayToString, StringToArray } from '@printful-ts/schemas/utils'

export const GetProductSizeGuideSearchInput = z
  .object({
    unit: ArrayToString(Unit).optional(),
  })
  .merge(WithLocale)

export type GetProductSizeGuideSearchInput = z.input<
  typeof GetProductSizeGuideSearchInput
>

export const GetProductSizeGuideSearchParams = z
  .object({
    unit: StringToArray.pipe(Unit.array()).optional(),
  })
  .merge(WithLocale)

export type GetProductSizeGuideSearchParams = z.input<
  typeof GetProductSizeGuideSearchParams
>

export const GetProductSizeGuideResponse = z.object({
  data: ProductSizeGuide,
  _links: z.object({
    self: HateoasLink,
    product_details: HateoasLink,
  }),
})
export type GetProductSizeGuideResponse = z.infer<
  typeof GetProductSizeGuideResponse
>
