import { z } from 'zod'

import {
  Currency,
  ReportType,
  StoreStatistics,
} from '@printful-ts/schemas/entities'
import { arrayToQueryString } from '@printful-ts/schemas/utils'

export const GetStoreStatisticsSearchParams = z.object({
  date_from: z.string().datetime(),
  date_to: z.string().datetime(),
  report_types: z.array(ReportType).transform(arrayToQueryString),
  currency: Currency.optional(),
})

export type GetStoreStatisticsSearchParams = z.infer<
  typeof GetStoreStatisticsSearchParams
>

export const GetStoreStatisticsResponse = z.object({
  data: StoreStatistics,
})
export type GetStoreStatisticsResponse = z.infer<
  typeof GetStoreStatisticsResponse
>
