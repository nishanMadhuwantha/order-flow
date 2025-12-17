import axios from "axios";
import type { Product } from '../features/products/productTypes.ts';
import { getQueryParam } from '../configs/util.ts';

const API_URL = "https://dummyjson.com/products?";

interface FetchProductsResponse {
  products: Product[];
  total: number;
}

export const getProductss = async (params: any): Promise<FetchProductsResponse> => {
  const requestedParams = getQueryParam(params);
  const response = await axios.get(API_URL+ requestedParams);
  return response.data;
};

export const getProducts = async ({
                                              search,
                                              category,
                                              minPrice,
                                              maxPrice,
                                              limit,
                                              skip,
                                            }: any) => {
  let url;
  if (category) {
    url = `https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`;
  } else if (search) {
    url = `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else {
    url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
  }
  const response = await axios.get(url);
  const allProducts = response.data;
  if (allProducts && allProducts?.length && (minPrice || maxPrice)) {
    const filtered = allProducts.filter(
      (p: any) => p.price >= minPrice && p.price <= maxPrice
    );
    return {
      products: filtered,
      total: filtered.length,
      skip,
      limit,
    };
  }
  return response.data;
};

export const getCategories = async (): Promise<string[]> => {
  const response = await axios.get('https://dummyjson.com/products/category-list');
  console.log(response)
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
};

export const updateProduct = async (
  id: string,
  payload: Partial<Product>
): Promise<Product> => {
  const { data } = await axios.patch(`https://dummyjson.com/products/${id}`, payload);
  return data;
};