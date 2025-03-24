import { faker } from '@faker-js/faker'

import {
  OAuthScope,
  OAuthScopeName,
  OAuthScopeValue,
} from '@printful-ts/schemas'

const oAuthScopeNameMock = (): OAuthScopeName =>
  faker.helpers.arrayElement(OAuthScopeName.options)
const oAuthScopeValueMock = (): OAuthScopeValue =>
  faker.helpers.arrayElement(OAuthScopeValue.options)

export const oAuthScopeMock = (mock?: OAuthScope): OAuthScope =>
  Object.assign(
    {
      name: oAuthScopeNameMock(),
      value: oAuthScopeValueMock(),
    },
    mock,
  )
