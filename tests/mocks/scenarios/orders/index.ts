import type { OrdersService } from '@printful-ts/services'

import { BASE_URL } from 'tests/mocks/constants'
import type { ServiceScenarioMock } from 'tests/utils'

import { confirmOrderScenarios } from './confirm-order.scenarios'
import { createOrderEstimationTasksScenarios } from './create-order-estimation-task.scenarios'
import { createOrderItemScenarios } from './create-order-item.scenarios'
import { createOrderScenarios } from './create-order.scenarios'
import { deleteOrderItemScenarios } from './delete-order-item.scenarios'
import { deleteOrderScenarios } from './delete-order.scenarios'
import { getOrderEstimationTasksScenarios } from './get-order-estimation-task.scenarios'
import { getOrderInvoiceScenarios } from './get-invoice.scenarios'
import { getOrderItemScenarios } from './get-order-item.scenarios'
import { getOrderScenarios } from './get-order.scenarios'
import { listOrderItemScenarios } from './list-order-items.scenarios'
import { listOrderShipmentsScenarios } from './list-order-shipments.scenarios'
import { listOrdersScenarios } from './list-orders.scenarios'
import { updateOrderItemScenarios } from './update-order-items.scenarios'
import { updateOrderScenarios } from './update-order.scenarios'

export const ordersScenarios = (
  baseUrl = BASE_URL,
): ServiceScenarioMock<OrdersService> => ({
  confirmOrder: confirmOrderScenarios(baseUrl),
  createOrder: createOrderScenarios(baseUrl),
  createOrderEstimationTask: createOrderEstimationTasksScenarios(baseUrl),
  createOrderItem: createOrderItemScenarios(baseUrl),
  deleteOrder: deleteOrderScenarios(baseUrl),
  deleteOrderItem: deleteOrderItemScenarios(baseUrl),
  getInvoice: getOrderInvoiceScenarios(baseUrl),
  getOrder: getOrderScenarios(baseUrl),
  getOrderEstimationTask: getOrderEstimationTasksScenarios(baseUrl),
  getOrderItem: getOrderItemScenarios(baseUrl),
  listOrderItems: listOrderItemScenarios(baseUrl),
  listOrders: listOrdersScenarios(baseUrl),
  listShipments: listOrderShipmentsScenarios(baseUrl),
  updateOrder: updateOrderScenarios(baseUrl),
  updateOrderItem: updateOrderItemScenarios(baseUrl),
})

export * from './confirm-order.scenarios'
export * from './create-order-estimation-task.scenarios'
export * from './create-order-item.scenarios'
export * from './create-order.scenarios'
export * from './delete-order-item.scenarios'
export * from './delete-order.scenarios'
export * from './get-invoice.scenarios'
export * from './get-order-estimation-task.scenarios'
export * from './get-order-item.scenarios'
export * from './get-order.scenarios'
export * from './list-order-items.scenarios'
export * from './list-order-shipments.scenarios'
export * from './list-orders.scenarios'
export * from './update-order-items.scenarios'
export * from './update-order.scenarios'
