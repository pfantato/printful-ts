import { faker } from '@faker-js/faker'

import {
  InsideLabelTypeOption,
  PlacementStatus,
  type PlacementOptions,
  type PlacementsList,
} from '@printful-ts/schemas'

import { techniqueKeyMock } from './technique.schema.mock'
import { layerMock } from './layer.schema.mock'
import { catalogOptionMock } from './catalog-option.schema.mock'

export const insideLabelTypeOptionMock = (): InsideLabelTypeOption =>
  faker.helpers.arrayElement(InsideLabelTypeOption.options)

export const placementOptionsMock = (
  name: PlacementOptions['name'],
): PlacementOptions =>
  ({
    name,
    value:
      name === 'unlimited_color'
        ? faker.datatype.boolean()
        : faker.helpers.arrayElement(InsideLabelTypeOption.options),
  }) as PlacementOptions

export const placementStatusMock = (): PlacementStatus =>
  faker.helpers.arrayElement(PlacementStatus.options)

export const placementListMock = (): PlacementsList => ({
  placement: faker.lorem.word(),
  technique: techniqueKeyMock(),
  layers: faker.helpers.multiple(layerMock),
  placement_options: faker.helpers.multiple(catalogOptionMock),
  status: placementStatusMock(),
  status_explanation: faker.lorem.sentence(),
})
