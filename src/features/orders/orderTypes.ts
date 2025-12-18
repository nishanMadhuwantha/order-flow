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
  totalProducts: number;
  discountedTotal: number;
  price: number;
  discountPercentage: number;
  title: string;
  thumbnail: string;
  createdAt: string;
}

export interface FetchOrdersResponse {
  carts: Order[];
  total: number;
}

export interface OrderFilters {
  search: string;
  status: any | null;
  quantity: [number, number];
}