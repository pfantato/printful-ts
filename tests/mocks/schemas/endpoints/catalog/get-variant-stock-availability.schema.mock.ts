import { faker } from '@faker-js/faker'

import {
  GetVariantStockAvailabilityResponse,
  GetVariantStockAvailabilitySearchInput,
  GetVariantStockAvailabilitySearchParams,
} from '@printful-ts/schemas'

import {
  filterSettingsMock,
  hateoasLinkMock,
  localeMock,
} from 'tests/mocks/schemas/common'
import {
  sellingRegionNameMock,
  techniqueKeyMock,
  variantStockAvailabilityMock,
} from 'tests/mocks/schemas/entities'

export const getVariantStockAvailabilitySearchInputMock =
  (): GetVariantStockAvailabilitySearchInput => ({
    locale: localeMock(),
    selling_region_name: sellingRegionNameMock(),
    techniques: faker.helpers.multiple(techniqueKeyMock, {
      count: { min: 1, max: 3 },
    }),
  })

export const getVariantStockAvailabilitySearchParamsMock =
  (): GetVariantStockAvailabilitySearchParams =>
    GetVariantStockAvailabilitySearchInput.parse(
      getVariantStockAvailabilitySearchInputMock(),
    )

export const getVariantStockAvailabilityResponseMock =
  (): GetVariantStockAvailabilityResponse => ({
    data: variantStockAvailabilityMock(),
    filter_settings: filterSettingsMock(),
    _links: {
      self: hateoasLinkMock(),
      variant: hateoasLinkMock(),
    },
  })
