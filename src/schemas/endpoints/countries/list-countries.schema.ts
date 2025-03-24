import { z } from 'zod'

import {
  Limit,
  Offset,
  Paging,
  PagingHateoasLinks,
} from '@printful-ts/schemas/common'
import { Country } from '@printful-ts/schemas/entities'

export const ListCountriesSearchParams = z.object({
  limit: Limit.optional(),
  offset: Offset.optional(),
})
export type ListCountriesSearchParams = z.infer<
  typeof ListCountriesSearchParams
>

export const ListCountriesResponse = z.object({
  data: Country.array(),
  paging: Paging,
  _links: PagingHateoasLinks,
})
export type ListCountriesResponse = z.infer<typeof ListCountriesResponse>
