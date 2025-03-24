import { z } from 'zod'

import { Color, HateoasLink } from '@printful-ts/schemas/common'
import { CatalogOption } from './catalog-option.schema'
import { DesignPlacement } from './design-placements.schema'
import { Technique } from './technique.schema'

const PositiveInt = z.number().int().min(0)

export const Product = z.object({
  id: PositiveInt,
  main_category_id: PositiveInt,
  type: z.string(),
  name: z.string(),
  brand: z.string(),
  model: z.string(),
  image: z.string().url(),
  variant_count: PositiveInt,
  is_discontinued: z.boolean(),
  description: z.string(),
  sizes: z.string().array().optional(),
  colors: Color.array().optional(),
  techniques: Technique.array().optional(),
  placements: DesignPlacement.array().optional(),
  product_options: CatalogOption.array().optional(),
  _links: z.object({
    self: HateoasLink,
    variants: HateoasLink,
    categories: HateoasLink,
    product_prices: HateoasLink,
    product_sizes: HateoasLink,
    product_images: HateoasLink,
    availability: HateoasLink,
  }),
})
export type Product = z.infer<typeof Product>
