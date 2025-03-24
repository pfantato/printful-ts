import { z } from 'zod'
import type { Options } from 'ky'

import { WithLocale } from './locale.schema'
import { StoreIdSchema } from './store-id.schema'
import { OAuthScopeValue } from './oauth.schema'

export const ValidationOptions = z.object({
  validateResponseSchema: z.boolean().default(true).optional(),
  validateInputSchema: z.boolean().default(true).optional(),
})
export type ValidationOptions = z.infer<typeof ValidationOptions>

const CustomOptions = z.object({
  checkScopes: OAuthScopeValue.array().optional(),
})
type CustomOptions = z.infer<typeof CustomOptions>

export const RequestOptions = ValidationOptions.merge(CustomOptions)
  .merge(StoreIdSchema)
  .merge(WithLocale)

export type RequestOptions = z.infer<typeof RequestOptions> & Options
