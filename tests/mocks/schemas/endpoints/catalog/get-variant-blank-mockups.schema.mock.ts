import { faker } from '@faker-js/faker'

import type {
  GetVariantBlankMockupsResponse,
  GetVariantBlankMockupsSearchInput,
  GetVariantBlankMockupsSearchParams,
} from '@printful-ts/schemas'

import { hateoasLinkMock, idMock, localeMock } from 'tests/mocks/schemas/common'
import { variantImagesMock } from 'tests/mocks/schemas/entities'

export const getVariantBlankMockupsSearchInputMock =
  (): GetVariantBlankMockupsSearchInput => ({
    locale: faker.helpers.maybe(localeMock),
    mockup_style_ids: faker.helpers.maybe(() =>
      faker.helpers.multiple(idMock, { count: { min: 0, max: 5 } }),
    ),
    placement: faker.lorem.slug(),
  })

export const getVariantBlankMockupsSearchParamsMock =
  (): GetVariantBlankMockupsSearchParams => ({
    locale: faker.helpers.maybe(localeMock),
    mockup_style_ids: faker.helpers.maybe(() =>
      faker.helpers.multiple(idMock, { count: { min: 0, max: 5 } }).join(','),
    ),
    placement: faker.lorem.slug(),
  })

export const getVariantBlankMockupsResponseMock =
  (): GetVariantBlankMockupsResponse => ({
    data: faker.helpers.multiple(variantImagesMock),
    _links: {
      self: hateoasLinkMock(),
      variant_details: hateoasLinkMock(),
    },
  })
