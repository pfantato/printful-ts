import { z } from 'zod'

import { TechniqueKey } from './technique.schema'

export const Currency = z
  .string()
  .refine(currency => currency.length === 3)
  .transform(val => val.toLocaleUpperCase())
export type Currency = z.infer<typeof Currency>

export const OptionPrice = z.object({
  name: z.string(),
  type: z.string(),
  values: z.array(z.array(z.any())),
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
  placement_options: z.array(OptionPrice),
  layers: z.array(
    z.object({
      type: z.string(),
      additional_price: z.string(),
      layer_options: z.array(OptionPrice),
    }),
  ),
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
  techniques: z.array(VariantTechniquePrice),
})
export type VariantPriceData = z.infer<typeof VariantPriceData>

export const ProductPrice = z.object({
  currency: Currency,
  product: z.object({
    id: z.number(),
    placements: z.array(AdditionalPlacement),
  }),
  variants: z.array(VariantPriceData),
})
export type ProductPrice = z.infer<typeof ProductPrice>

export const VariantPrice = ProductPrice.pick({
  currency: true,
  product: true,
}).extend({
  variant: VariantPriceData,
})
export type VariantPrice = z.infer<typeof VariantPrice>
