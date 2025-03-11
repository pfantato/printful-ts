import { z } from 'zod'

import { Paging, PagingHateoasLinks } from '@printful-ts/schemas/common'
import { Store } from '@printful-ts/schemas/entities'

export const ListStoresResponse = z.object({
  data: z.array(Store),
  paging: Paging,
  _links: PagingHateoasLinks,
})
export type ListStoresResponse = z.infer<typeof ListStoresResponse>
