import { ALL_PRODUCTS, SINGLE_PRODUCT } from "#/constants/query-keys.constants";
import type { Pagination } from "#/types/api.types";
import type { Product, ProductsResponse } from "#/types/product.types";
import { queryOptions, infiniteQueryOptions } from "@tanstack/react-query";

export function useProductByIdQueryOptions(id: number) {
  return queryOptions({
    queryKey: [SINGLE_PRODUCT, { id }],
    queryFn: () => getProductById(id),
  });
}

async function getProductById(id: number): Promise<Product> {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  if (!response.ok) throw Error("Failed to fetch");
  return await response.json();
}

export function useProductsQueryOptions(pagination?: Pagination) {
  return queryOptions({
    queryKey: [ALL_PRODUCTS, pagination],
    queryFn: () => getProducts(pagination),
  });
}

export function useInfiniteProductsQueryOption() {
  return infiniteQueryOptions({
    queryKey: ["infinite-products"],

    queryFn: ({ pageParam }) =>
      getProducts({
        limit: 9,
        skip: pageParam,
      }),

    initialPageParam: 0,

    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + lastPage.limit;
      if (nextSkip >= lastPage.total) {
        return undefined;
      }
      return nextSkip;
    },
  });
}

async function getProducts(pagination?: Pagination): Promise<ProductsResponse> {
  let paramString = "";
  if (pagination) {
    const params = new URLSearchParams({
      limit: pagination?.limit.toString(),
      skip: pagination?.skip.toString(),
    });
    paramString = `?${params.toString()}`;
  }

  const response = await fetch(`https://dummyjson.com/products${paramString}`);
  if (!response.ok) throw Error("Failed to fetch");
  return await response.json();
}

export async function addProduct(title: string) {
  const response = await fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  console.warn(response);
  if (!response.ok) throw new Error("Failed to create product");
  return await response.json();
}
