import { z } from 'zod'

import { HateoasLink } from '../common'

export const InvoiceDocument = z.object({
  media_type: z.string(),
  content: z.string(),
  _links: z.object({
    self: HateoasLink,
    order: HateoasLink,
  }),
})
export type InvoiceDocument = z.infer<typeof InvoiceDocument>
