export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  thumbnail: string;
  rating: number;
  active: boolean;
}

export interface FetchProductsParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  limit: number;
  skip: number;
  order: string;
  sortBy: string;
}

export interface FetchProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
