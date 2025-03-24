import { z } from 'zod'

import { Unit } from '@printful-ts/schemas/common'

export const MeasurementValue = z
  .object({
    size: z.string(),
    value: z.string(),
  })
  .or(
    z.object({
      size: z.string(),
      min_value: z.string(),
      max_value: z.string(),
    }),
  )
export type MeasurementValue = z.infer<typeof MeasurementValue>

export const Measurement = z.object({
  type_label: z.string(),
  unit: Unit,
  values: MeasurementValue.array(),
})
export type Measurement = z.infer<typeof Measurement>

export const SizeType = z.enum([
  'measure_yourself',
  'product_measure',
  'international',
])
export type SizeType = z.infer<typeof SizeType>

export const SizeTable = z.object({
  type: SizeType,
  unit: Unit,
  description: z.string(),
  image_url: z.string().url(),
  image_description: z.string(),
  measurements: Measurement.array(),
})
export type SizeTable = z.infer<typeof SizeTable>

export const ProductSizeGuide = z.object({
  catalog_product_id: z.number(),
  available_sizes: z.string().array(),
  size_tables: SizeTable.array(),
})
export type ProductSizeGuide = z.infer<typeof ProductSizeGuide>
