import { faker } from '@faker-js/faker'

import type { Country, CountryState } from '@printful-ts/schemas'

export const countryStateMock = (): CountryState => ({
  code: faker.location.state({ abbreviated: true }),
  name: faker.location.state(),
})

export const countryMock = (): Country => ({
  code: faker.location.countryCode(),
  name: faker.location.country(),
  states: faker.helpers.multiple(countryStateMock),
})
