import { faker } from '@faker-js/faker'

import type {
  AdditionalPlacement,
  OptionPrice,
  ProductPrice,
  VariantPrice,
  VariantPriceData,
  VariantTechniquePrice,
} from '@printful-ts/schemas'

import { idMock } from 'tests/mocks/schemas/common'

import { techniqueKeyMock } from './technique.schema.mock'

export const optionPriceMock = (): OptionPrice => ({
  name: faker.word.sample(),
  type: faker.word.sample(),
  values: faker.helpers.multiple(
    () => faker.helpers.multiple(faker.string.numeric),
    {
      count: { min: 1, max: 3 },
    },
  ),
  description: faker.word.words(),
  prices: faker.helpers.multiple(faker.finance.amount, {
    count: { min: 1, max: 3 },
  }),
})

export const additionalPlacementMock = (): AdditionalPlacement => ({
  id: faker.string.uuid(),
  title: faker.lorem.words(),
  type: faker.lorem.words(),
  technique_key: techniqueKeyMock(),
  price: faker.commerce.price(),
  discounted_price: faker.commerce.price(),
  placement_options: faker.helpers.multiple(optionPriceMock, {
    count: { min: 1, max: 3 },
  }),
  layers: faker.helpers.multiple(() => ({
    type: faker.lorem.words(),
    additional_price: faker.commerce.price(),
    layer_options: faker.helpers.multiple(optionPriceMock, {
      count: { min: 1, max: 3 },
    }),
  })),
})

export const variantTechniquePriceMock = (): VariantTechniquePrice => ({
  technique_key: techniqueKeyMock(),
  technique_display_name: faker.lorem.words(),
  price: faker.commerce.price(),
  discounted_price: faker.commerce.price(),
})

export const variantPriceDataMock = (): VariantPriceData => ({
  id: idMock(),
  techniques: faker.helpers.multiple(variantTechniquePriceMock, {
    count: { min: 1, max: 3 },
  }),
})

export const productPriceMock = (): ProductPrice => ({
  currency: faker.finance.currencyCode(),
  product: {
    id: idMock(),
    placements: faker.helpers.multiple(additionalPlacementMock, {
      count: { min: 1, max: 3 },
    }),
  },
  variants: faker.helpers.multiple(variantPriceDataMock),
})

export const variantPriceMock = (): VariantPrice => ({
  currency: faker.finance.currencyCode(),
  product: {
    id: idMock(),
    placements: faker.helpers.multiple(additionalPlacementMock, {
      count: { min: 1, max: 3 },
    }),
  },
  variant: variantPriceDataMock(),
})
