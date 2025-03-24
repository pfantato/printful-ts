import { faker } from '@faker-js/faker'

import {
  DeliveryStatus,
  ShipmentStatus,
  type DepartureAddress,
  type EstimatedDelivery,
  type Shipment,
  type ShipmentItem,
  type TrackingEvent,
} from '@printful-ts/schemas'
import dayjs from 'dayjs'

import { hateoasLinkMock, idMock } from 'tests/mocks/schemas/common'

export const shipmentStatusMock = (): ShipmentStatus =>
  faker.helpers.arrayElement(ShipmentStatus.options)

export const deliveryStatusMock = (): DeliveryStatus =>
  faker.helpers.arrayElement(DeliveryStatus.options)

export const departureAddressMock = (): DepartureAddress => ({
  country_name: faker.location.country(),
  country_code: faker.location.countryCode(),
  state_code: faker.location.state({ abbreviated: true }),
})

export const trackingEventMock = (): TrackingEvent => ({
  triggered_at: faker.date.recent().toISOString(),
  description: faker.lorem.sentence(),
})

export const estimatedDeliveryMock = (): EstimatedDelivery => ({
  from_date: faker.date.recent().toISOString(),
  to_date: faker.date.recent().toISOString(),
  calculated_at: faker.date.recent().toISOString(),
})

export const shipmentItemMock = (): ShipmentItem => ({
  id: idMock(),
  order_item_id: idMock(),
  order_item_external_id: faker.string.uuid(),
  order_item_name: faker.commerce.productName(),
  quantity: faker.number.int({ min: 0, max: 100 }),
  _links: {
    order_item: hateoasLinkMock(),
  },
})

export const shipmentMock = (): Shipment => ({
  id: idMock(),
  order_id: idMock(),
  carrier: faker.company.name(),
  shipment_status: shipmentStatusMock(),
  shipped_at: faker.helpers.maybe(() =>
    dayjs(faker.date.recent()).toISOString(),
  ),
  delivery_status: deliveryStatusMock(),
  delivery_at: faker.helpers.maybe(() =>
    dayjs(faker.date.recent()).toISOString(),
  ),
  departure_addess: departureAddressMock(),
  is_reshipment: faker.datatype.boolean(),
  tracking_url: faker.helpers.maybe(faker.internet.url),
  tracking_events: faker.helpers.multiple(trackingEventMock),
  shipment_items: faker.helpers.multiple(shipmentItemMock),
  _links: {
    self: hateoasLinkMock(),
    order: hateoasLinkMock(),
  },
})
