import { http, HttpResponse } from 'msw'

import { BASE_URL } from 'tests/mocks/constants'
import { getOAuthScopesResponseMock } from 'tests/mocks/schemas'
import { generateErrorScenarios } from 'tests/mocks/utils'

export const listOauthScopesScenarios = (baseUrl = BASE_URL) => {
  const endpoint = `${baseUrl}/v2/oauth-scopes`

  return {
    success: [
      http.get(endpoint, () =>
        HttpResponse.json(getOAuthScopesResponseMock(), { status: 200 }),
      ),
    ],
    errors: generateErrorScenarios([401, 500], { endpoint }),
  }
}
