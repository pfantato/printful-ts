import { faker } from '@faker-js/faker'

import type { HateoasLink, PagingHateoasLinks } from '@printful-ts/schemas'
import { deepMerge } from '@printful-ts/utils'

export const hateoasLinkMock = (): HateoasLink => ({
  href: faker.internet.url(),
})

export const pagingHateoasLinksMock = (
  mock?: PagingHateoasLinks,
): PagingHateoasLinks =>
  deepMerge(
    {
      self: hateoasLinkMock(),
      first: hateoasLinkMock(),
      last: hateoasLinkMock(),
      next: faker.helpers.maybe(hateoasLinkMock),
      previous: faker.helpers.maybe(hateoasLinkMock),
    },
    mock,
  )
