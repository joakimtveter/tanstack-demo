import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { useProductsByCategoryQueryOptions } from "#/api/category.api";
import {
  addProduct,
  useInfiniteProductsQueryOption,
  useProductByIdQueryOptions,
  useProductsQueryOptions,
} from "#/api/products.api";
import type { AddProductInput } from "#/schemas/product.schema";
import type { Pagination } from "#/types/api.types";
import {
  ALL_PRODUCTS,
  INFINITE_PRODUCTS,
} from "#/constants/query-keys.constants";

export function useProducts(pagination?: Pagination) {
  return useQuery(useProductsQueryOptions(pagination));
}

export function useInfiniteProducts() {
  return useInfiniteQuery(useInfiniteProductsQueryOption());
}

export function useProductsByCategory(category: string) {
  return useQuery(useProductsByCategoryQueryOptions(category));
}

export function useProductById(id: number) {
  return useQuery(useProductByIdQueryOptions(id));
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: AddProductInput) => addProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [INFINITE_PRODUCTS] });
      queryClient.invalidateQueries({ queryKey: [ALL_PRODUCTS] });
    },
  });
}
