import { http, HttpResponse } from 'msw'

import { PrintfulApiResources } from '@printful-ts/constants'

import { BASE_URL } from 'tests/mocks/constants'
import { listCatalogCategoriesResponseMock } from 'tests/mocks/schemas'
import { generateErrorScenarios } from 'tests/mocks/utils'

export const listCategoriesScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/${PrintfulApiResources.CATALOG_CATEGORIES}`

  return {
    success: [
      http.get(endpoint, () =>
        HttpResponse.json(listCatalogCategoriesResponseMock(), {
          status: 200,
        }),
      ),
    ],
    errors: generateErrorScenarios([400, 401], { endpoint }),
  }
}
