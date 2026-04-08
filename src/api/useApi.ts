import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import type { AddProductInput } from "#/schemas/product.schema";
import { useProductsByCategoryQueryOptions } from "#/api/category.api";
import {
  addProduct,
  useInfiniteProductsQueryOption,
  useProductByIdQueryOptions,
  useProductsQueryOptions,
} from "#/api/products.api";
import type { Pagination } from "#/types/api.types";

export function useProducts(pagination?: Pagination) {
  return useQuery(useProductsQueryOptions(pagination));
}

export function useInfinateProducts() {
  return useInfiniteQuery(useInfiniteProductsQueryOption());
}

export function useProductsByCategory(category: string) {
  return useQuery(useProductsByCategoryQueryOptions(category));
}

export function useProductById(id: number) {
  return useQuery(useProductByIdQueryOptions(id));
}

export function useAddProduct() {
  return useMutation({
    mutationFn: (data: AddProductInput) => addProduct(data),
    onSuccess: (data) => console.log(data),
  });
}
