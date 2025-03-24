import { faker } from '@faker-js/faker'

import type {
  GetProductResponse,
  GetProductSearchInput,
} from '@printful-ts/schemas'

import {
  productMock,
  sellingRegionNameMock,
} from 'tests/mocks/schemas/entities'

export const getProductSearchInputMock = (): GetProductSearchInput => ({
  selling_region_name: faker.helpers.maybe(sellingRegionNameMock),
})

export const getProductResponseMock = (): GetProductResponse => ({
  data: productMock(),
})
