import { z } from 'zod'

import { Color, HateoasLink } from '@printful-ts/schemas/common'
import { CatalogOption } from './catalog-option.schema'
import { DesignPlacement } from './design-placements.schema'
import { Technique } from './technique.schema'

export const Product = z.object({
  id: z.number(),
  main_category_id: z.number(),
  type: z.string(),
  name: z.string(),
  brand: z.string(),
  model: z.string(),
  image: z.string().url(),
  variant_count: z.number(),
  is_discontinued: z.boolean(),
  description: z.string(),
  sizes: z.array(z.string()),
  colors: z.array(Color),
  techniques: z.array(Technique),
  placements: z.array(DesignPlacement),
  product_options: z.array(CatalogOption),
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
