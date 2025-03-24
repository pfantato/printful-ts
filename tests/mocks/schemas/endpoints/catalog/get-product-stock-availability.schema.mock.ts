import { faker } from '@faker-js/faker'

import {
  GetProductStockAvailabilityResponse,
  GetProductStockAvailabilitySearchInput,
  GetProductStockAvailabilitySearchParams,
} from '@printful-ts/schemas'

import {
  filterSettingsMock,
  hateoasLinkMock,
  limitMock,
  localeMock,
  offsetMock,
  pagingHateoasLinksMock,
  pagingMock,
} from 'tests/mocks/schemas/common'
import {
  sellingRegionNameMock,
  techniqueKeyMock,
  variantStockAvailabilityMock,
} from 'tests/mocks/schemas/entities'

export const getProductStockAvailabilitySearchInputMock =
  (): GetProductStockAvailabilitySearchInput => ({
    techniques: faker.helpers.multiple(() => techniqueKeyMock(), {
      count: { min: 1, max: 3 },
    }),
    selling_region_name: sellingRegionNameMock(),
    limit: limitMock(),
    offset: offsetMock(),
    locale: localeMock(),
  })
export const getProductStockAvailabilitySearchParamsMock =
  (): GetProductStockAvailabilitySearchParams =>
    GetProductStockAvailabilitySearchInput.parse(
      getProductStockAvailabilitySearchInputMock(),
    )

export const getProductStockAvailabilityResponseMock =
  (): GetProductStockAvailabilityResponse => ({
    data: faker.helpers.multiple(variantStockAvailabilityMock, {
      count: { min: 1, max: 5 },
    }),
    paging: pagingMock(),
    filter_settings: filterSettingsMock(),
    _links: {
      ...pagingHateoasLinksMock(),
      product: hateoasLinkMock(),
    },
  })
