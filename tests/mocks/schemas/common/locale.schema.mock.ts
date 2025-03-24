import { faker } from '@faker-js/faker'

import { SupportedLocales, type Locale } from '@printful-ts/schemas'

export const localeMock = (): Locale =>
  faker.helpers.arrayElement(SupportedLocales.options)
