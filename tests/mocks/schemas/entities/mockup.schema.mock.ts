import { faker } from '@faker-js/faker'

import type { MockupStyle, MockupStyles } from '@printful-ts/schemas'

import { idMock } from 'tests/mocks/schemas/common'

import { techniqueKeyMock } from './technique.schema.mock'

export const mockupStyleMock = (): MockupStyle => ({
  id: idMock(),
  category_name: faker.commerce.productAdjective(),
  view_name: faker.commerce.productAdjective(),
  restricted_to_variants: [
    faker.helpers.multiple(() =>
      faker.helpers.multiple(() => faker.helpers.replaceSymbols('##########')),
    ),
  ],
})

export const mockupStylesMock = (): MockupStyles => ({
  placement: faker.word.sample(),
  display_name: faker.commerce.productAdjective(),
  technique: techniqueKeyMock(),
  print_area_width: faker.number.int({ min: 0, max: 1080 }),
  print_area_height: faker.number.int({ min: 0, max: 1080 }),
  print_area_type: faker.helpers.arrayElement(['simple', 'advanced']),
  dpi: faker.number.int({ min: 0, max: 1080 }),
  mockup_styles: faker.helpers.multiple(mockupStyleMock),
})
