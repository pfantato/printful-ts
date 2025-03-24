import { faker } from '@faker-js/faker'

import { SortDirection, SortType } from '@printful-ts/schemas'

export const sortDirectionMock = (): SortDirection =>
  faker.helpers.arrayElement(SortDirection.options)
export const sortTypeMock = (): SortType =>
  faker.helpers.arrayElement(SortType.options)
