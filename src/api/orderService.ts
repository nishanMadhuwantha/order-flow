import {
  getQueryParam,
} from '../configs/utils/util.ts';
import type {
  FetchOrdersResponse,
  Order,
} from '../features/orders/orderTypes.ts';
import { HttpSvc } from '../configs/services/http-svc.tsx';
import { mapOrder, mapOrders } from '../configs/mapper/order.ts';

export const getOrders = async (
  params: Record<string, unknown>
): Promise<FetchOrdersResponse> => {
  const query = getQueryParam(params);
  const data = await HttpSvc.get<FetchOrdersResponse>(`/carts?${query}`);

  return {
    ...data,
    carts: mapOrders(data.carts),
  };
};

export const getOrderById = async (id: string): Promise<Order> => {
  const data = await HttpSvc.get<Order>(`/carts/${id}`);
  return mapOrder(data);
};