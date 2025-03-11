import { z } from 'zod'

import { Store } from '@printful-ts/schemas/entities'

export const GetStoreResponse = z.object({
  data: z.array(Store),
})
export type GetStoreResponse = z.infer<typeof GetStoreResponse>
