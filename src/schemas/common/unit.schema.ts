import { z } from 'zod'

export const Unit = z.enum(['inches', 'cm'])
export type Unit = z.infer<typeof Unit>

export const MeasurementSystem = z.enum(['imperial', 'metric'])
export type MeasurementSystem = z.infer<typeof MeasurementSystem>
