import { faker } from '@faker-js/faker'

import type { Store } from '@printful-ts/schemas'

import { idMock } from 'tests/mocks/schemas/common'

export const storeMock = (): Store => ({
  id: idMock(),
  type: faker.word.sample(),
  name: faker.company.name(),
})
