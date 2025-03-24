import { faker } from '@faker-js/faker'

import type { Address } from '@printful-ts/schemas'

export const addressMock = (): Address => ({
  name: faker.person.firstName(),
  company: faker.helpers.maybe(faker.company.name),
  address1: faker.location.streetAddress(),
  address2: faker.helpers.maybe(faker.location.secondaryAddress),
  city: faker.location.city(),
  state_code: faker.location.state({ abbreviated: true }),
  state_name: faker.helpers.maybe(faker.location.state),
  country_code: faker.location.countryCode(),
  country_name: faker.helpers.maybe(faker.location.country),
  zip: faker.location.zipCode(),
  phone: faker.helpers.maybe(faker.phone.number),
  email: faker.internet.email(),
  tax_number: faker.helpers.maybe(() =>
    faker.helpers.replaceSymbols('##########'),
  ),
})
