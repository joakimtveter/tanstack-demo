import { createFileRoute } from "@tanstack/react-router";
import { useInfinateProducts } from "#/api/useApi";
import ProductList from "#/components/product-list";
import { useInfiniteScroll } from "#/hooks/useInfiniteScroll";

export const Route = createFileRoute("/scroll")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Scroll infinite query example | Tanstack Query Demo" }],
  }),
});

function RouteComponent() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfinateProducts();

  const loadMoreRef = useInfiniteScroll({
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  if (status === "pending") return <div>Loading ...</div>;
  if (status === "error") return <div>{JSON.stringify(error)}</div>;

  const products = data?.pages.flatMap((page) => page.products);

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1 className="text-4xl font-bold mb-6">Infinate scroll page</h1>

      <ProductList products={products} />

      <div ref={loadMoreRef} className="flex justify-center py-6">
        {isFetchingNextPage && (
          <span className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        )}
      </div>

      {!hasNextPage && (
        <p className="text-center text-gray-500 py-4">No more products</p>
      )}
    </main>
  );
}
