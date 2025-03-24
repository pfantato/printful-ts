import { faker } from '@faker-js/faker'

import { ProductOptionsName, type ProductOptions } from '@printful-ts/schemas'

export const productOptionsNameMock = (): ProductOptionsName =>
  faker.helpers.arrayElement(ProductOptionsName.options)

export const productOptionsMock = (): ProductOptions => ({
  name: productOptionsNameMock(),
  value: faker.datatype.boolean(),
})
