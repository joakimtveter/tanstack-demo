import { useProductsQueryOptions } from "#/api/products.api";
import { useProducts } from "#/api/useApi";
import Pagination from "#/components/pagination";
import ProductList from "#/components/product-list";
import { createFileRoute } from "@tanstack/react-router";
import z from "zod";

const productSearchSchema = z.object({
  page: z.number().default(1),
  pageSize: z.number().default(12),
});

export const Route = createFileRoute("/products/")({
  component: RouteComponent,
  validateSearch: productSearchSchema,
  head: () => ({
    meta: [{ title: "Paginated query example | Tanstack Query Demo" }],
  }),
  loaderDeps: ({ search: { page, pageSize } }) => ({ page, pageSize }),
  loader: ({ context: { queryClient }, deps: { page, pageSize } }) =>
    queryClient.ensureQueryData(
      useProductsQueryOptions({
        limit: pageSize,
        skip: (page - 1) * pageSize,
      }),
    ),
});

function RouteComponent() {
  const { page, pageSize } = Route.useSearch();
  const { data } = useProducts({
    limit: pageSize,
    skip: (page - 1) * pageSize,
  });

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1 className="text-4xl font-bold mb-6">Paginated Store page</h1>
      <ProductList products={data?.products ?? []} />
      <Pagination
        currentPage={page}
        total={data?.total ?? 1}
        limit={pageSize}
      />
    </main>
  );
}
