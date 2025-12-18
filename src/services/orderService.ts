import axios from "axios";
import {
  getQueryParam,
  getRandomDate,
  getRandomElement,
} from '../configs/utils/util.ts';
import type { Order } from '../features/orders/orderTypes.ts';
import { Status } from '../configs/constants.tsx';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface FetchOrdersResponse {
  carts: Order[];
  total: number;
}

export interface OrderFilters {
  search: string;
  status: any | null;
  quantity: [number, number];
}

const customerNames = ['Alice Smith', 'Bob Jones', 'Charlie Miller', 'David Davis', 'Emma Rodriguez', 'Frank Kumar', 'Grace Jones', 'Henry Rodriguez'];
const statuses = [Status.PENDING.key, Status.SHIPPED.key, Status.DELIVERED.key, Status.CANCELLED.key];

export const getOrders = async (params: any): Promise<FetchOrdersResponse> => {
  const requestedParams = getQueryParam(params);
  const response = await axios.get(`${BASE_URL}/carts?${requestedParams}`);
  response.data.carts.forEach((cart: Order) => {
    cart.customerName = getRandomElement(customerNames);
    cart.status = getRandomElement(statuses);
    cart.createdAt = getRandomDate();
    cart.quantity = cart.totalQuantity;
  })
  return response.data;
};

export const getOrderId = async (id: string): Promise<Order> => {
  const { data } = await axios.get(`${BASE_URL}/carts/${id}`);
  data.customerName = getRandomElement(customerNames);
  data.status = getRandomElement(statuses);
  data.createdAt = getRandomDate();
  data.quantity = data.totalQuantity;
  return data;
};