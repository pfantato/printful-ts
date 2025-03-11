import { InvoiceDocument } from '@printful-ts/schemas/entities'
import { z } from 'zod'

export const GetInvoiceResponse = z.object({
  data: InvoiceDocument,
})
export type GetInvoiceResponse = z.infer<typeof GetInvoiceResponse>
