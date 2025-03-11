import type { Options } from 'ky'

import { ORDERS_RESOURCE } from '@printful-ts/constants'
import {
  ConfirmOrderResponse,
  CreateOrderBody,
  CreateOrderEstimationTaskBody,
  CreateOrderItemBody,
  CreateOrderItemResponse,
  GetOrderItemPathParams as OrderItemPathParams,
  GetOrderItemResponse,
  GetOrderItemsResponse,
  GetOrderItemsSearchParams,
  ListOrdersResponse,
  ListOrdersSearchParams,
  OrderResponse,
  type StoreId,
  type ExternalIdParam,
  GetInvoiceResponse,
  GetOrderEstimationTaskResponse,
  CreateOrderEstimationTaskResponse,
} from '@printful-ts/schemas'
import { PrintfulApiService } from './printful-api.service'
import {
  ListOrderShipmentsResponse,
  ListOrderShipmentsSearchParams,
} from '@printful-ts/schemas/endpoints/orders/list-order-shipments.schema'

export class OrdersService extends PrintfulApiService {
  async listOrders(params: ListOrdersSearchParams = {}, options: Options = {}) {
    const { store_id, ...searchParams } = ListOrdersSearchParams.parse(params)

    return await this.request(
      `${ORDERS_RESOURCE}`,
      {
        ...options,
        store_id,
        searchParams,
      },
      ListOrdersResponse,
    )
  }

  async getOrder(
    order_id: ExternalIdParam,
    store_id?: StoreId,
    options: Options = {},
  ) {
    return await this.request(
      `${ORDERS_RESOURCE}/${order_id}`,
      {
        ...options,
        store_id: store_id,
      },
      OrderResponse,
    )
  }

  async createOrder(body: CreateOrderBody, options: Options = {}) {
    const { store_id, ...json } = CreateOrderBody.parse(body)

    return await this.request(
      `${ORDERS_RESOURCE}`,
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
    order_id: ExternalIdParam,
    body: CreateOrderBody,
    options: Options = {},
  ) {
    const { store_id, ...json } = CreateOrderBody.parse(body)

    return await this.request(
      `${ORDERS_RESOURCE}/${order_id}`,
      {
        ...options,
        method: 'pat',
        store_id,
        json,
      },
      OrderResponse,
    )
  }

  async confirmOrder(
    order_id: ExternalIdParam,
    store_id?: StoreId,
    options: Options = {},
  ) {
    return await this.request(
      `${ORDERS_RESOURCE}/${order_id}/confirmation`,
      {
        ...options,
        method: 'post',
        store_id,
      },
      ConfirmOrderResponse,
    )
  }

  async deleteOrder(
    order_id: ExternalIdParam,
    store_id?: StoreId,
    options: Options = {},
  ) {
    return await this.request(`${ORDERS_RESOURCE}/${order_id}`, {
      ...options,
      method: 'delete',
      store_id,
      validateResponseSchema: false,
    })
  }

  async listOrderItems(
    order_id: ExternalIdParam,
    params: GetOrderItemsSearchParams,
    options: Options = {},
  ) {
    const { store_id, ...searchParams } =
      GetOrderItemsSearchParams.parse(params)

    return await this.request(
      `${ORDERS_RESOURCE}/${order_id}/order-items`,
      {
        ...options,
        store_id,
        searchParams,
      },
      GetOrderItemsResponse,
    )
  }

  async getOrderItem(
    path_params: OrderItemPathParams,
    store_id: number,
    options: Options = {},
  ) {
    const { order_id, order_item_id } = OrderItemPathParams.parse(path_params)

    return await this.request(
      `${ORDERS_RESOURCE}/${order_id}/order-items/${order_item_id}`,
      {
        ...options,
        store_id: store_id,
      },
      GetOrderItemResponse,
    )
  }

  async createOrderItem(
    order_id: ExternalIdParam,
    body: CreateOrderItemBody,
    options: Options = {},
  ) {
    const { store_id, ...json } = CreateOrderItemBody.parse(body)

    return await this.request(
      `${ORDERS_RESOURCE}/${order_id}/order-items`,
      {
        ...options,
        method: 'post',
        store_id,
        json,
      },
      CreateOrderItemResponse,
    )
  }

  async updateOrderItem(
    path_params: OrderItemPathParams,
    body: CreateOrderItemBody,
    options: Options = {},
  ) {
    const { order_id, order_item_id } = OrderItemPathParams.parse(path_params)
    const { store_id, ...json } = CreateOrderItemBody.parse(body)

    return await this.request(
      `${ORDERS_RESOURCE}/${order_id}/order-items/${order_item_id}`,
      {
        ...options,
        method: 'patch',
        store_id,
        json,
      },
      CreateOrderItemResponse,
    )
  }

  async deleteOrderItem(
    path_params: OrderItemPathParams,
    store_id: number,
    options: Options = {},
  ) {
    const { order_id, order_item_id } = OrderItemPathParams.parse(path_params)

    return await this.request(
      `${ORDERS_RESOURCE}/${order_id}/order-items/${order_item_id}`,
      {
        ...options,
        method: 'delete',
        store_id,
        validateResponseSchema: false,
      },
    )
  }

  async listShipments(
    order_id: ExternalIdParam,
    params: ListOrderShipmentsSearchParams,
    options: Options = {},
  ) {
    const { store_id, ...searchParams } =
      ListOrderShipmentsSearchParams.parse(params)

    return await this.request(
      `${ORDERS_RESOURCE}/${order_id}/shipments`,
      {
        ...options,
        store_id,
        searchParams,
      },
      ListOrderShipmentsResponse,
    )
  }

  async getInvoice(
    order_id: ExternalIdParam,
    store_id?: StoreId,
    options: Options = {},
  ) {
    return await this.request(
      `${ORDERS_RESOURCE}/${order_id}/invoice`,
      {
        ...options,
        store_id,
      },
      GetInvoiceResponse,
    )
  }

  async getOrderEstimationTask(
    task_id: string,
    store_id?: StoreId,
    options: Options = {},
  ) {
    return await this.request(
      `${ORDERS_RESOURCE}/estimation-task/${task_id}`,
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

    return await this.request(
      `${ORDERS_RESOURCE}/estimation-task`,
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
