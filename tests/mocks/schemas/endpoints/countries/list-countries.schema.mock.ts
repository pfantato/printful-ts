import { faker } from '@faker-js/faker'

import type {
  ListCountriesResponse,
  ListCountriesSearchParams,
} from '@printful-ts/schemas'

import {
  limitMock,
  offsetMock,
  pagingHateoasLinksMock,
  pagingMock,
} from 'tests/mocks/schemas/common'
import { countryMock } from 'tests/mocks/schemas/entities'

export const listCountriesSearchParamsMock = (): ListCountriesSearchParams => ({
  limit: faker.helpers.maybe(limitMock),
  offset: faker.helpers.maybe(offsetMock),
})

export const listCountriesResponseMock = (): ListCountriesResponse => ({
  data: faker.helpers.multiple(countryMock, { count: { max: 50, min: 1 } }),
  paging: pagingMock(),
  _links: pagingHateoasLinksMock(),
})
