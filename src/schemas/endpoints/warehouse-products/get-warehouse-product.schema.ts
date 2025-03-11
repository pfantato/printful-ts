import { z } from 'zod'

import { WarehouseProduct } from '@printful-ts/schemas/entities'

export const GetWarehouseProductResponse = z.object({
  data: WarehouseProduct,
})
export type GetWarehouseProductResponse = z.infer<
  typeof GetWarehouseProductResponse
>
