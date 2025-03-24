import { faker } from '@faker-js/faker'

import type { PrintfulResponseError } from '@printful-ts/schemas'

export const printfulResponseErrorMock = (
  mock?: PrintfulResponseError,
): PrintfulResponseError =>
  Object.assign(
    {
      type: faker.internet.url(),
      status: faker.helpers.arrayElement([
        400, 401, 403, 404, 409, 429, 500, 503,
      ]),
      title: faker.lorem.words(),
      detail: faker.lorem.sentence(),
      instance: faker.helpers.maybe(faker.internet.url),
    },
    mock,
  )
