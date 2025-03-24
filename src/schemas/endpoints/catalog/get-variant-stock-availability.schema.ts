import { z } from 'zod'

import { FilterSettings, HateoasLink } from '@printful-ts/schemas/common'
import { VariantStockAvailability } from '@printful-ts/schemas/entities'

import {
  GetProductStockAvailabilitySearchParams,
  GetProductStockAvailabilitySearchInput,
} from './get-product-stock-availability.schema'

export const GetVariantStockAvailabilitySearchInput =
  GetProductStockAvailabilitySearchInput.pick({
    techniques: true,
    selling_region_name: true,
    locale: true,
  })
export type GetVariantStockAvailabilitySearchInput = z.input<
  typeof GetVariantStockAvailabilitySearchInput
>

export const GetVariantStockAvailabilitySearchParams =
  GetProductStockAvailabilitySearchParams.pick({
    techniques: true,
    selling_region_name: true,
    locale: true,
  })
export type GetVariantStockAvailabilitySearchParams = z.input<
  typeof GetVariantStockAvailabilitySearchParams
>

export const GetVariantStockAvailabilityResponse = z.object({
  data: VariantStockAvailability,
  filter_settings: FilterSettings,
  _links: z.object({
    self: HateoasLink,
    variant: HateoasLink,
  }),
})
export type GetVariantStockAvailabilityResponse = z.infer<
  typeof GetVariantStockAvailabilityResponse
>
