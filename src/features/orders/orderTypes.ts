import type { Product } from '../products/productTypes.ts';

export type OrderStatus =
  | 'Pending'
  | 'Processing'
  | 'Shipped'
  | 'Delivered';

export interface Order {
  id: number;
  customerName: string;
  status: OrderStatus;
  products: Product[];
  total: number;
  quantity: number;
  totalQuantity: number;
  createdAt: string;
}

export interface FetchOrdersResponse {
  carts: Order[];
  total: number;
}

export interface OrderFilters {
  customerName: string;
  status: string | null;
  quantityRange: [number, number];
}