import { faker } from '@faker-js/faker'

import type { InvoiceDocument } from '@printful-ts/schemas'

import { hateoasLinkMock } from 'tests/mocks/schemas/common'

export const invoiceMock = (): InvoiceDocument => ({
  media_type: faker.internet.domainWord(),
  content: faker.lorem.words(),
  _links: {
    self: hateoasLinkMock(),
    order: hateoasLinkMock(),
  },
})
