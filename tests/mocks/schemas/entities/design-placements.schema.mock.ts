import { faker } from '@faker-js/faker'

import type { DesignPlacement } from '@printful-ts/schemas'

import { techniqueKeyMock } from './technique.schema.mock'
import { layerMock } from './layer.schema.mock'
import { catalogOptionMock } from './catalog-option.schema.mock'

export const designPlacementMock = (): DesignPlacement => ({
  placement: faker.word.sample(),
  technique: techniqueKeyMock(),
  print_area_width: faker.number.int({ min: 0, max: 1080 }),
  print_area_height: faker.number.int({ min: 0, max: 1080 }),
  layers: faker.helpers.multiple(layerMock),
  placement_options: faker.helpers.multiple(catalogOptionMock),
  conflicting_placements: [faker.word.sample()],
})
