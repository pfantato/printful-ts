import { applyMixins, type Constructor } from '@printful-ts/utils'
import { PrintfulApiServiceMock } from 'tests/mocks'

export function applyServiceMock(
  mockService: Constructor,
  baseService: Constructor,
) {
  applyMixins(mockService, [PrintfulApiServiceMock, baseService])
}
