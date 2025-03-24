import { faker } from '@faker-js/faker'

import type { GetOAuthScopesResponse } from '@printful-ts/schemas'

import { hateoasLinkMock, oAuthScopeMock } from 'tests/mocks/schemas/common'

export const getOAuthScopesResponseMock = (): GetOAuthScopesResponse => ({
  data: faker.helpers.multiple(oAuthScopeMock),
  _links: {
    self: hateoasLinkMock(),
  },
})
