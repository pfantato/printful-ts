import { faker } from '@faker-js/faker'

import type {
  GetStoreStatisticsResponse,
  GetStoreStatisticsSearchInput,
} from '@printful-ts/schemas'
import dayjs from 'dayjs'

import {
  reportTypeMock,
  storeStatisticsMock,
} from 'tests/mocks/schemas/entities'

export const getStoreStatisticsSearchInputMock = (
  input?: GetStoreStatisticsSearchInput,
): GetStoreStatisticsSearchInput => {
  const date_from = dayjs(faker.date.soon()).format('YYYY-MM-DD')
  const date_to = dayjs(faker.date.soon({ refDate: date_from })).format(
    'YYYY-MM-DD',
  )

  return {
    date_from,
    date_to,
    report_types: faker.helpers.multiple(reportTypeMock, {
      count: {
        min: 1,
        max: 3,
      },
    }),
    currency: faker.finance.currencyCode(),
    ...input,
  }
}

export const getStoreStatisticsResponseMock =
  (): GetStoreStatisticsResponse => ({
    data: storeStatisticsMock(),
  })
