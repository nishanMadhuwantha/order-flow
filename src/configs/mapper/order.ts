import type { Order } from '../../features/orders/orderTypes';
import { Status } from '../constants.tsx';
import { getRandomDate, getRandomElement } from '../utils/util.ts';

const customerNames = [
  'Alice Smith',
  'Bob Jones',
  'Charlie Miller',
  'David Davis',
  'Emma Rodriguez',
  'Frank Kumar',
  'Grace Jones',
  'Henry Rodriguez',
];

const statuses = [
  Status.PENDING.key,
  Status.SHIPPED.key,
  Status.DELIVERED.key,
  Status.CANCELLED.key,
];

export const mapOrder = (order: Order): Order => ({
  ...order,
  customerName: getRandomElement(customerNames),
  status: getRandomElement(statuses),
  createdAt: getRandomDate(),
  quantity: order.totalQuantity,
});

export const mapOrders = (orders: Order[]): Order[] => orders.map(mapOrder);
