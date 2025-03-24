import { faker } from '@faker-js/faker'

import {
  Paging,
  type ListProductsResponse,
  type ListProductsSearchInput,
  type ListProductsSearchParams,
} from '@printful-ts/schemas'

import {
  colorValueMock,
  idMock,
  limitMock,
  offsetMock,
  pagingHateoasLinksMock,
  pagingMock,
  sortDirectionMock,
  sortTypeMock,
} from 'tests/mocks/schemas/common'
import {
  productMock,
  sellingRegionNameMock,
  techniqueKeyMock,
} from 'tests/mocks/schemas/entities'
import { z } from 'zod'

export const listProductsSearchInputMock = (): ListProductsSearchInput => ({
  category_ids: faker.helpers.multiple(idMock, { count: { min: 0, max: 10 } }),
  colors: faker.helpers.multiple(colorValueMock, {
    count: { min: 0, max: 10 },
  }),
  placements: faker.helpers.multiple(faker.lorem.slug, {
    count: { min: 0, max: 3 },
  }),
  limit: faker.helpers.maybe(limitMock),
  offset: faker.helpers.maybe(offsetMock),
  selling_region_name: faker.helpers.maybe(sellingRegionNameMock),
  sort_type: faker.helpers.maybe(sortTypeMock),
  sort_direction: faker.helpers.maybe(sortDirectionMock),
  techniques: faker.helpers.maybe(() =>
    faker.helpers.multiple(techniqueKeyMock, { count: { min: 0, max: 2 } }),
  ),
})
export const listProductsSearchParamsMock = (): ListProductsSearchParams => {
  const {
    category_ids,
    colors,
    placements,
    limit,
    offset,
    selling_region_name,
    sort_type,
    sort_direction,
    techniques,
  } = listProductsSearchInputMock()
  return {
    category_ids: category_ids.join(','),
    colors: colors.join(','),
    placements: placements.join(','),
    limit: faker.helpers.maybe(() => limit.toLocaleString()),
    offset: faker.helpers.maybe(() => offset.toLocaleString()),
    selling_region_name,
    sort_type,
    sort_direction,
    techniques: techniques.join(','),
  }
}

export const listProductsResponseMock = (
  length: number = 100,
  input?: Pick<ListProductsSearchInput, 'limit' | 'offset'>,
): ListProductsResponse => {
  const max = z.number().positive().max(100).catch(100).default(1).parse(length)

  const data = faker.helpers.multiple(productMock, { count: { min: 1, max } })

  const paging = pagingMock(
    Paging.partial().parse({ ...input, total: data.length }),
  )

  return {
    data,
    paging,
    _links: pagingHateoasLinksMock(),
  }
}
