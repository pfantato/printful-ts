import { faker } from '@faker-js/faker'

import { PrintfulVersion, type PrintfulConfig } from '@printful-ts/schemas'

export const printfulVersionMock = (): PrintfulVersion =>
  faker.helpers.arrayElement(PrintfulVersion.options)

export const printfulConfigMock = (mock?: PrintfulConfig): PrintfulConfig =>
  Object.assign(
    {
      privateToken: faker.internet.jwt(),
      baseUrl: faker.internet.url(),
      version: printfulVersionMock(),
    },
    mock,
  )
