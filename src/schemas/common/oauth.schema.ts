import { z } from 'zod'

export const OAuthScopeName = z.enum([
  'View orders of the authorized store',
  'View and manage orders of the authorized store',
  'View store products',
  'View and manage store products',
  'View store files',
  'View and manage store files',
  'View store webhooks',
  'View and manage store webhooks',
])
export type OAuthScopeName = z.infer<typeof OAuthScopeName>
export const OAuthScopeValue = z.enum([
  'orders/read',
  'orders',
  'sync_products/read',
  'sync_products',
  'file_library/read',
  'file_library',
  'webhooks/read',
  'webhooks/read',
])
export type OAuthScopeValue = z.infer<typeof OAuthScopeValue>

export const OAuthScope = z.object({
  name: OAuthScopeName,
  value: OAuthScopeValue,
})
export type OAuthScope = z.infer<typeof OAuthScope>
