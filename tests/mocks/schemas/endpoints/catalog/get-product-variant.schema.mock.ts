import { faker } from '@faker-js/faker'

import type { GetProductVariantResponse } from '@printful-ts/schemas'

import { hateoasLinkMock } from 'tests/mocks/schemas/common'
import { productVariantMock } from 'tests/mocks/schemas/entities'

export const getProductVariantResponseMock = (): GetProductVariantResponse => ({
  data: faker.helpers.multiple(productVariantMock),
  _links: {
    self: hateoasLinkMock(),
    product_variants: faker.helpers.maybe(hateoasLinkMock),
    product_details: faker.helpers.maybe(hateoasLinkMock),
    variant_prices: faker.helpers.maybe(hateoasLinkMock),
    variant_images: faker.helpers.maybe(hateoasLinkMock),
  },
})
