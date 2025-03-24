import { faker } from '@faker-js/faker'

import type { Color, ColorValue } from '@printful-ts/schemas'

export const colorValueMock = (): ColorValue => faker.color.rgb()

export const colorMock = (mock?: Color): Color =>
  Object.assign(
    {
      name: faker.color.human(),
      value: colorValueMock(),
    },
    mock,
  )
