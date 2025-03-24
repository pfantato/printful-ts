import { faker } from '@faker-js/faker'

import type { ProductVariant } from '@printful-ts/schemas'

import {
  colorValueMock,
  hateoasLinkMock,
  idMock,
} from 'tests/mocks/schemas/common'

export const productVariantMock = (): ProductVariant => ({
  id: idMock(),
  catalog_product_id: idMock(),
  name: faker.commerce.productName(),
  image: faker.image.url(),
  size: faker.commerce.productAdjective(),
  color: colorValueMock(),
  color_code: colorValueMock(),
  color_code2: colorValueMock(),
  _links: {
    self: hateoasLinkMock(),
    product_details: hateoasLinkMock(),
    product_variants: hateoasLinkMock(),
    variant_prices: hateoasLinkMock(),
    variant_images: hateoasLinkMock(),
    variant_availability: hateoasLinkMock(),
  },
})
