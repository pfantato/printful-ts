import { z } from 'zod'

import {
  Currency,
  ReportType,
  StoreStatistics,
} from '@printful-ts/schemas/entities'
import { ArrayToString, StringToArray } from '@printful-ts/schemas/utils'

export const GetStoreStatisticsSearchInput = z
  .object({
    date_from: z.string().date(),
    date_to: z.string().date(),
    report_types: ArrayToString(ReportType),
    currency: Currency.optional(),
  })
  .required({
    report_types: true,
    date_from: true,
    date_to: true,
  })

export type GetStoreStatisticsSearchInput = z.input<
  typeof GetStoreStatisticsSearchInput
>

export const GetStoreStatisticsSearchParams = z.object({
  date_from: z.string().date(),
  date_to: z.string().date(),
  report_types: StringToArray.pipe(ReportType.array()),
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
