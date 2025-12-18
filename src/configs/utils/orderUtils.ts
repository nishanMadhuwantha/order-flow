import { likeOperator } from './util.ts';
import type { Order, OrderFilters } from '../../features/orders/orderTypes.ts';

export const filterOrders = (
  orders: Order[],
  filters: OrderFilters
): Order[] => {
  return orders.filter((order) => {
    const matchCustomer = likeOperator(order.customerName, filters.search);
    const matchStatus = !filters.status || order.status === filters.status.key;
    const matchQuantity =
      order.quantity >= filters.quantity[0] &&
      order.quantity <= filters.quantity[1];

    return matchCustomer && matchStatus && matchQuantity;
  });
};
