import { faker } from '@faker-js/faker'

import { SellingRegionName } from '@printful-ts/schemas'

export const sellingRegionNameMock = (): SellingRegionName =>
  faker.helpers.arrayElement(SellingRegionName.options)
