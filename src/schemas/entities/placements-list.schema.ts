import { z } from 'zod'

import { DesignPlacement } from './design-placements.schema'

export const InsideLabelTypeOption = z.enum(['native', 'custom'])
export type InsideLabelTypeOption = z.infer<typeof InsideLabelTypeOption>

export const PlacementOptions = z.discriminatedUnion('name', [
  z.object({
    name: z.literal('unlimited_color'),
    value: z.boolean(),
  }),
  z.object({
    name: z.literal('inside_label_type'),
    values: InsideLabelTypeOption,
  }),
])
export type PlacementOptions = z.infer<typeof PlacementOptions>

export const PlacementStatus = z.enum(['ok', 'failed'])
export type PlacementStatus = z.infer<typeof PlacementStatus>

export const PlacementsList = DesignPlacement.pick({
  placement: true,
  technique: true,
  layers: true,
  placement_options: true,
}).merge(
  z.object({
    status: PlacementStatus,
    status_explanation: z.string(),
  }),
)
export type PlacementsList = z.infer<typeof PlacementsList>
