import { faker } from '@faker-js/faker'

import type { ExternalId, ExternalOrInternalId } from '@printful-ts/schemas'
import {
  FakerNumberOptions,
  FakerPositiveNumberOptions,
} from 'tests/mocks/utils'

export const externalIdMock = (): ExternalId => `@${faker.string.uuid()}`

export const idMock = (options: FakerPositiveNumberOptions = {}) =>
  positiveNumberMock({ min: 1, ...options })

export const externalOrInternalIdMock = (
  internalIdProbability: number = 0.2,
): ExternalOrInternalId =>
  faker.helpers.maybe(idMock, { probability: internalIdProbability }) ??
  externalIdMock()

export const positiveNumberMock = (options: FakerNumberOptions = {}) => {
  return faker.number.int(
    Object.assign(
      {
        min: 1,
        max: 100000,
      },
      FakerNumberOptions.parse(options),
    ),
  )
}
