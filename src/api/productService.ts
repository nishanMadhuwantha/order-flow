import type {
  FetchProductsParams,
  FetchProductsResponse,
  Product,
} from '../features/products/productTypes.ts';
import { HttpSvc } from '../configs/services/http-svc.tsx';

export const getProducts = async ({
  search,
  category,
  minPrice,
  maxPrice,
  limit,
  skip,
}: FetchProductsParams): Promise<FetchProductsResponse> => {
  let path = '';
  if (category) {
    path = `/products/category/${category}?limit=${limit}&skip=${skip}`;
  } else if (search) {
    path = `/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else {
    path = `/products?limit=${limit}&skip=${skip}`;
  }

  const data = await HttpSvc.get<FetchProductsResponse>(path);
  if (
    (minPrice !== undefined || maxPrice !== undefined) &&
    data.products?.length
  ) {
    const filtered = data.products.filter((product: any) => {
      const aboveMin = minPrice === undefined || product.price >= minPrice;
      const belowMax = maxPrice === undefined || product.price <= maxPrice;
      return aboveMin && belowMax;
    });

    return {
      products: filtered,
      total: filtered.length,
      skip,
      limit,
    };
  }

  return data;
};

export const getCategories = async (): Promise<string[]> => {
  return HttpSvc.get<string[]>('/products/category-list');
};

export const getProductById = async (id: string): Promise<Product> => {
  return HttpSvc.get<Product>(`/products/${id}`);
};

export const updateProduct = async (
  id: string,
  payload: Partial<Product>
): Promise<Product> => {
  return HttpSvc.patch<Product>(`/products/${id}`, payload);
};

export const deleteProducts = async (id: number): Promise<Product> => {
  return HttpSvc.delete<Product>(`/products/${id}`);
};
