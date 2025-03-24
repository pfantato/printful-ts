import { faker } from '@faker-js/faker'

import type { VariantImage, VariantImages } from '@printful-ts/schemas'

import { colorValueMock, idMock } from 'tests/mocks/schemas/common'

export const variantImageMock = (): VariantImage => ({
  placement: faker.word.sample(),
  background_image: faker.image.url(),
  background_color: faker.helpers.maybe(colorValueMock),
  image_url: faker.image.url(),
})

export const variantImagesMock = (): VariantImages => ({
  catalog_variant_id: idMock(),
  color: colorValueMock(),
  primary_hex_color: faker.helpers.maybe(colorValueMock),
  secondary_hex_color: faker.helpers.maybe(colorValueMock),
  images: faker.helpers.multiple(variantImageMock),
})
