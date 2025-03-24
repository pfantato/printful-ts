import { faker } from '@faker-js/faker'
import { MeasurementSystem, Unit } from '@printful-ts/schemas'

export const unitMock = (): Unit => faker.helpers.arrayElement(Unit.options)
export const measurementSystemMock = (): MeasurementSystem =>
  faker.helpers.arrayElement(MeasurementSystem.options)
