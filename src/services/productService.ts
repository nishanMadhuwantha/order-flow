import axios from "axios";
import type { Product } from '../features/products/productTypes.ts';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
    url = `${BASE_URL}/products/category/${category}?limit=${limit}&skip=${skip}`;
  } else if (search) {
    url = `${BASE_URL}/products/search?q=${encodeURIComponent(search)}&limit=${limit}&skip=${skip}`;
  } else {
    url = `${BASE_URL}/products?limit=${limit}&skip=${skip}`;
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
  const response = await axios.get(`${BASE_URL}/products/category-list`);
  console.log(response)
  return response.data;
};

export const getProductById = async (id: string): Promise<Product> => {
  const { data } = await axios.get(`${BASE_URL}/products/${id}`);
  return data;
};

export const updateProduct = async (
  id: string,
  payload: Partial<Product>
): Promise<Product> => {
  const { data } = await axios.patch(`${BASE_URL}/products/${id}`, payload);
  return data;
};

export const deleteProducts = async (
  id: number,
): Promise<Product> => {
  const { data } = await axios.delete(`${BASE_URL}/products/${id}`);
  return data;
};