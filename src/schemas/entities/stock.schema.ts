import { z } from 'zod'

import { HateoasLink, InternalId } from '@printful-ts/schemas/common'

import { SellingRegionName } from './selling-region-name.schema'
import { TechniqueKey } from './technique.schema'

export const Availability = z.enum([
  'in stock',
  'out of stock',
  'not fulfillable',
  'unknown',
])
export type Availability = z.infer<typeof Availability>

export const PlacementOptionAvailability = z.object({
  name: z.string(),
  availability: Availability.default(Availability.enum.unknown),
})
export type PlacementOptionAvailability = z.infer<
  typeof PlacementOptionAvailability
>

export const SellingRegionStockAvailability = PlacementOptionAvailability.merge(
  z.object({
    name: SellingRegionName,
    placement_option_availability: PlacementOptionAvailability.array(),
  }),
)
export type SellingRegionStockAvailability = z.infer<
  typeof SellingRegionStockAvailability
>

export const TechniqueStockAvailability = z.object({
  technique: TechniqueKey,
  selling_regions: SellingRegionStockAvailability.array(),
})
export type TechniqueStockAvailability = z.infer<
  typeof TechniqueStockAvailability
>

export const VariantStockAvailability = z.object({
  catalog_variant_id: InternalId,
  techniques: TechniqueStockAvailability.array(),
  _links: z.object({
    variant: HateoasLink,
  }),
})
export type VariantStockAvailability = z.infer<typeof VariantStockAvailability>
