import type { ProductsResponse } from "#/types/product.types";
import { queryOptions } from "@tanstack/react-query";

export function useProductsByCategoryQueryOptions(category: string) {
  return queryOptions({
    queryKey: ["products", { category }],
    queryFn: () => getProductsByCategory(category),
  });
}

async function getProductsByCategory(category: string): Promise<ProductsResponse> {
  const response = await fetch(`https://dummyjson.com/products/category/${category}`);
  if (!response.ok) throw Error("Failed to fetch");
  return await response.json();
}
