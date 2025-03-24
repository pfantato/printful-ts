import type { Options } from 'ky'

import { PrintfulApiResources } from '@printful-ts/constants'
import {
  ConfirmOrderResponse,
  OrderBody,
  CreateOrderEstimationTaskBody,
  CreateOrderEstimationTaskResponse,
  OrderItemBody,
  OrderItemResponse,
  ExternalOrInternalId,
  GetInvoiceResponse,
  GetOrderEstimationTaskResponse,
  GetOrderItemResponse,
  ListOrderItemsResponse,
  ListOrderItemsSearchInput,
  ListOrderShipmentsResponse,
  ListOrdersResponse,
  ListOrdersSearchInput,
  OrderItemPathParams,
  OrderResponse,
  InternalId,
  ListOrderShipmentsSearchInput,
} from '@printful-ts/schemas'

import { PrintfulApiService } from './printful-api.service'
import { z } from 'zod'

export class OrdersService extends PrintfulApiService {
  async listOrders(params: ListOrdersSearchInput, options: Options = {}) {
    const { store_id, ...searchParams } = ListOrdersSearchInput.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}`,
      {
        ...options,
        store_id,
        searchParams,
      },
      ListOrdersResponse,
    )
  }

  async getOrder(
    orderId: ExternalOrInternalId,
    store_id?: InternalId,
    options: Options = {},
  ) {
    const order_id = ExternalOrInternalId.parse(orderId)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}/${order_id}`,
      {
        ...options,
        store_id,
      },
      OrderResponse,
    )
  }

  async createOrder(body: OrderBody, options: Options = {}) {
    const { store_id: store_id, ...json } = OrderBody.parse(body)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}`,
      {
        ...options,
        method: 'post',
        store_id,
        json,
      },
      OrderResponse,
    )
  }

  async updateOrder(
    orderId: ExternalOrInternalId,
    body: OrderBody,
    options: Options = {},
  ) {
    const { store_id: storeId, ...json } = OrderBody.parse(body)

    const store_id = InternalId.parse(storeId)
    const order_id = InternalId.parse(orderId)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}/${order_id}`,
      {
        ...options,
        method: 'patch',
        store_id,
        json,
      },
      OrderResponse,
    )
  }

  async confirmOrder(
    orderId: ExternalOrInternalId,
    storeId?: InternalId,
    options: Options = {},
  ) {
    const order_id = InternalId.parse(orderId)
    const store_id = InternalId.parse(storeId)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}/${order_id}/confirmation`,
      {
        ...options,
        method: 'post',
        store_id,
      },
      ConfirmOrderResponse,
    )
  }

  async deleteOrder(
    orderId: ExternalOrInternalId,
    storeId: InternalId,
    options: Options = {},
  ) {
    const store_id = InternalId.parse(storeId)
    const order_id = InternalId.parse(orderId)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}/${order_id}`,
      {
        ...options,
        method: 'delete',
        store_id,
        validateResponseSchema: false,
      },
    )
  }

  async listOrderItems(
    orderId: ExternalOrInternalId,
    params: ListOrderItemsSearchInput,
    options: Options = {},
  ) {
    const { store_id: storeId, ...searchParams } =
      ListOrderItemsSearchInput.parse(params)

    const store_id = InternalId.parse(storeId)
    const order_id = InternalId.parse(orderId)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}/${order_id}/order-items`,
      {
        ...options,
        store_id,
        searchParams,
      },
      ListOrderItemsResponse,
    )
  }

  async getOrderItem(
    path_params: OrderItemPathParams,
    storeId: number,
    options: Options = {},
  ) {
    const { order_id: orderId, order_item_id: orderItemId } =
      OrderItemPathParams.parse(path_params)

    const store_id = InternalId.parse(storeId)
    const order_id = ExternalOrInternalId.parse(orderId)
    const order_item_id = ExternalOrInternalId.parse(orderItemId)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}/${order_id}/order-items/${order_item_id}`,
      {
        ...options,
        store_id,
      },
      GetOrderItemResponse,
    )
  }

  async createOrderItem(
    orderId: ExternalOrInternalId,
    body: OrderItemBody,
    options: Options = {},
  ) {
    const { store_id: storeId, ...json } = OrderItemBody.parse(body)

    const store_id = InternalId.parse(storeId)
    const order_id = ExternalOrInternalId.parse(orderId)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}/${order_id}/order-items`,
      {
        ...options,
        method: 'post',
        store_id,
        json,
      },
      OrderItemResponse,
    )
  }

  async updateOrderItem(
    path_params: OrderItemPathParams,
    body: OrderItemBody,
    options: Options = {},
  ) {
    const { order_id, order_item_id } = OrderItemPathParams.parse(path_params)
    const { store_id: storeId, ...json } = OrderItemBody.parse(body)
    const store_id = InternalId.parse(storeId)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}/${order_id}/order-items/${order_item_id}`,
      {
        ...options,
        method: 'patch',
        store_id,
        json,
      },
      OrderItemResponse,
    )
  }

  async deleteOrderItem(
    path_params: OrderItemPathParams,
    storeId: number,
    options: Options = {},
  ) {
    const { order_id, order_item_id } = OrderItemPathParams.parse(path_params)
    const store_id = InternalId.parse(storeId)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}/${order_id}/order-items/${order_item_id}`,
      {
        ...options,
        method: 'delete',
        store_id,
        validateResponseSchema: false,
      },
    )
  }

  async listShipments(
    order_id: ExternalOrInternalId,
    params: ListOrderShipmentsSearchInput,
    options: Options = {},
  ) {
    const { store_id, ...searchParams } =
      ListOrderShipmentsSearchInput.parse(params)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}/${order_id}/shipments`,
      {
        ...options,
        store_id,
        searchParams,
      },
      ListOrderShipmentsResponse,
    )
  }

  async getInvoice(
    orderId: ExternalOrInternalId,
    storeId?: InternalId,
    options: Options = {},
  ) {
    const store_id = InternalId.parse(storeId)
    const order_id = ExternalOrInternalId.parse(orderId)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDERS}/${order_id}/invoices`,
      {
        ...options,
        store_id,
      },
      GetInvoiceResponse,
    )
  }

  async getOrderEstimationTask(
    taskId: string,
    storeId?: InternalId,
    options: Options = {},
  ) {
    const store_id = InternalId.parse(storeId)
    const task_id = z.string().nonempty().parse(taskId)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDER_ESTIMATION_TASKS}/${task_id}`,
      {
        ...options,
        store_id,
      },
      GetOrderEstimationTaskResponse,
    )
  }

  async createOrderEstimationTask(
    body: CreateOrderEstimationTaskBody,
    options: Options = {},
  ) {
    const { store_id, ...json } = CreateOrderEstimationTaskBody.parse(body)

    return await this.makeRequest(
      `${PrintfulApiResources.ORDER_ESTIMATION_TASKS}`,
      {
        ...options,
        method: 'post',
        store_id,
        json,
      },
      CreateOrderEstimationTaskResponse,
    )
  }
}
