import { faker } from '@faker-js/faker'

import {
  Orientation,
  TemplatePositioning,
  TemplateType,
  type MockupTemplates,
} from '@printful-ts/schemas'

import { idMock } from 'tests/mocks/schemas/common'

import { techniqueKeyMock } from './technique.schema.mock'

export const templatePositioningMock = (): TemplatePositioning =>
  faker.helpers.arrayElement(TemplatePositioning.options)

export const orientationMock = (): Orientation =>
  faker.helpers.arrayElement(Orientation.options)

export const templateTypeMock = (): TemplateType =>
  faker.helpers.arrayElement(TemplateType.options)

export const mockupTemplatesMock = (): MockupTemplates => ({
  catalog_variant_ids: faker.helpers.multiple(idMock),
  placement: faker.word.sample(),
  technique: techniqueKeyMock(),
  image_url: faker.image.url(),
  background_url: faker.image.url(),
  background_color: faker.color.rgb({ format: 'hex' }),
  template_width: faker.number.int({ min: 0, max: 1080 }),
  template_height: faker.number.int({ min: 0, max: 1080 }),
  print_area_width: faker.number.int({ min: 0, max: 1080 }),
  print_area_height: faker.number.int({ min: 0, max: 1080 }),
  print_area_top: faker.number.int({ min: 0, max: 1080 }),
  print_area_left: faker.number.int({ min: 0, max: 1080 }),
  template_positioning: templatePositioningMock(),
  orientation: orientationMock(),
  template_type: templateTypeMock(),
})
