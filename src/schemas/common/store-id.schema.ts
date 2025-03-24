import { z } from 'zod'
import { InternalId } from './id.schema'

export const StoreIdSchema = z.object({
  store_id: InternalId,
})
export type StoreIdSchema = z.infer<typeof StoreIdSchema>
