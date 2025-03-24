import type { GetInvoiceResponse } from '@printful-ts/schemas'

import { invoiceMock } from 'tests/mocks/schemas/entities'

export const getInvoiceResponseMock = (): GetInvoiceResponse => ({
  data: invoiceMock(),
})
