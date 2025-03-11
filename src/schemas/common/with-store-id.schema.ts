import { z } from 'zod'

export const StoreId = z.number().optional()
export type StoreId = z.infer<typeof StoreId>

export const WithStoreId = <T extends z.ZodRawShape>(schema: z.ZodObject<T>) =>
  schema.extend({
    store_id: StoreId,
  })

export type WithStoreId<T extends z.ZodRawShape> = z.infer<
  ReturnType<typeof WithStoreId<T>> & { storeId: number }
>
