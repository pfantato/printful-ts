import { faker } from '@faker-js/faker'
import { TechniqueKey, type Technique } from '@printful-ts/schemas'

export const techniqueKeyMock = (): TechniqueKey =>
  faker.helpers.arrayElement(Object.values(TechniqueKey.options))

export const techniqueMock = (): Technique => ({
  key: techniqueKeyMock(),
  display_name: faker.commerce.productAdjective(),
  is_default: faker.datatype.boolean(),
})
