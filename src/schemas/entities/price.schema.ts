import { z } from 'zod'

import { TechniqueKey } from './technique.schema'

export const Currency = z
  .string()
  .refine(currency => currency.length === 3)
  .pipe(z.coerce.string())
  .transform(val => val.toLocaleUpperCase())
export type Currency = z.infer<typeof Currency>

export const OptionPrice = z.object({
  name: z.string(),
  type: z.string(),
  values: z.any().array().array(),
  description: z.string(),
  prices: z.any(),
})
export type OptionPrice = z.infer<typeof OptionPrice>

export const AdditionalPlacement = z.object({
  id: z.string(),
  title: z.string(),
  type: z.string(),
  technique_key: z.string(),
  price: z.string(),
  discounted_price: z.string(),
  placement_options: OptionPrice.array(),
  layers: z
    .object({
      type: z.string(),
      additional_price: z.string(),
      layer_options: OptionPrice.array(),
    })
    .array(),
})
export type AdditionalPlacement = z.infer<typeof AdditionalPlacement>

export const VariantTechniquePrice = z.object({
  technique_key: TechniqueKey,
  technique_display_name: z.string(),
  price: z.string(),
  discounted_price: z.string(),
})
export type VariantTechniquePrice = z.infer<typeof VariantTechniquePrice>

export const VariantPriceData = z.object({
  id: z.number(),
  techniques: VariantTechniquePrice.array(),
})
export type VariantPriceData = z.infer<typeof VariantPriceData>

export const ProductPrice = z.object({
  currency: Currency,
  product: z.object({
    id: z.number(),
    placements: AdditionalPlacement.array(),
  }),
  variants: VariantPriceData.array(),
})
export type ProductPrice = z.infer<typeof ProductPrice>

export const VariantPrice = ProductPrice.pick({
  currency: true,
  product: true,
}).merge(
  z.object({
    variant: VariantPriceData,
  }),
)
export type VariantPrice = z.infer<typeof VariantPrice>
