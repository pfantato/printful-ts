import type { GetCatalogCategoryResponse } from '@printful-ts/schemas'

import { hateoasLinkMock } from 'tests/mocks/schemas/common'
import { catalogCategoryMock } from 'tests/mocks/schemas/entities'

export const getCatalogCategoryResponseMock =
  (): GetCatalogCategoryResponse => ({
    data: catalogCategoryMock(),
    _links: {
      all_categories: hateoasLinkMock(),
    },
  })
