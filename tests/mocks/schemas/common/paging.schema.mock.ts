import { faker } from '@faker-js/faker'

import type {
  FilterSettings,
  Limit,
  Offset,
  Paging,
} from '@printful-ts/schemas'

import { FakerNumberOptions } from 'tests/mocks/utils'
import { positiveNumberMock } from './id.schema.mock'

export const limitMock = (mock: FakerNumberOptions = {}): Limit =>
  positiveNumberMock(
    Object.assign({ min: 0, max: 100 }, FakerNumberOptions.parse(mock)),
  )

export const offsetMock = (mock: FakerNumberOptions = {}): Offset =>
  positiveNumberMock(
    Object.assign({ min: 0, max: 1000 }, FakerNumberOptions.parse(mock)),
  )

export const filterSettingsMock = (
  mock?: Partial<FilterSettings>,
): FilterSettings =>
  Object.assign(
    {
      name: faker.word.noun(),
      value: faker.word.sample(),
    },
    mock,
  )

export const pagingMock = (mock?: Partial<Paging>): Paging => {
  return Object.assign(
    {
      limit: limitMock(),
      offset: offsetMock(),
      total: faker.number.int({ min: 0, max: 1000 }),
    },
    mock,
  )
}
