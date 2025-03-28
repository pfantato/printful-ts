import { z } from 'zod'

import { HateoasLink, OAuthScope } from '@printful-ts/schemas/common'

export const GetOAuthScopesResponse = z.object({
  data: OAuthScope.array(),
  _links: z.object({
    self: HateoasLink,
  }),
})
export type GetOAuthScopesResponse = z.infer<typeof GetOAuthScopesResponse>
