import { faker } from '@faker-js/faker'

import type { ListStoresResponse } from '@printful-ts/schemas'

import { pagingHateoasLinksMock, pagingMock } from 'tests/mocks/schemas/common'
import { storeMock } from 'tests/mocks/schemas/entities'
import { FakerArrayOptions } from 'tests/mocks/utils'

export const listStoresResponseMock = (
  mockOptions: FakerArrayOptions = {},
): ListStoresResponse => {
  const data = faker.helpers.multiple(storeMock, {
    count: Object.assign(
      { min: 1, max: 10 },
      FakerArrayOptions.parse(mockOptions),
    ),
  })
  return {
    data,
    paging: pagingMock({
      total: data.length,
    }),
    _links: pagingHateoasLinksMock(),
  }
}
