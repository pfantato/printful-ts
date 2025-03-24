import { faker } from '@faker-js/faker'

import {
  Availability,
  type PlacementOptionAvailability,
  type SellingRegionStockAvailability,
  type TechniqueStockAvailability,
  type VariantStockAvailability,
} from '@printful-ts/schemas'

import { hateoasLinkMock, idMock } from 'tests/mocks/schemas/common'

import { sellingRegionNameMock } from './selling-region-name.schema.mock'
import { techniqueKeyMock } from './technique.schema.mock'

export const availabilityMock = (): Availability =>
  faker.helpers.arrayElement(Availability.options)

export const placementOptionAvailabilityMock =
  (): PlacementOptionAvailability => ({
    name: faker.lorem.word(),
    availability: availabilityMock(),
  })

export const sellingRegionStockAvailabilityMock =
  (): SellingRegionStockAvailability => ({
    name: sellingRegionNameMock(),
    placement_option_availability: faker.helpers.multiple(
      placementOptionAvailabilityMock,
      { count: { min: 1, max: 5 } },
    ),
  })

export const techniqueStockAvailabilityMock =
  (): TechniqueStockAvailability => ({
    technique: techniqueKeyMock(),
    selling_regions: faker.helpers.multiple(
      sellingRegionStockAvailabilityMock,
      { count: { min: 1, max: 5 } },
    ),
  })

export const variantStockAvailabilityMock = (): VariantStockAvailability => ({
  catalog_variant_id: idMock(),
  techniques: faker.helpers.multiple(techniqueStockAvailabilityMock, {
    count: { min: 1, max: 3 },
  }),
  _links: {
    variant: hateoasLinkMock(),
  },
})
