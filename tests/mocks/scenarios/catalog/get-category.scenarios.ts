import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { getCatalogCategoryResponseMock } from 'tests/mocks/schemas'
import { generateErrorScenarios } from 'tests/mocks/utils'

export const getCategoryScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_CATEGORIES}/:category_id`

  return {
    success: [
      http.get(endpoint, () =>
        HttpResponse.json(getCatalogCategoryResponseMock(), {
          status: 200,
        }),
      ),
    ],
    errors: generateErrorScenarios([401, 404], { endpoint }),
  }
}
