import { createFileRoute } from "@tanstack/react-router";
import { useInfinateProducts } from "#/api/useApi";
import ProductList from "#/components/product-list";

export const Route = createFileRoute("/load-more")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfinateProducts();

  if (status === "pending") return <div>Loading ...</div>;
  if (status === "error") return <div>{JSON.stringify(error)}</div>;

  const products = data?.pages.flatMap((page) => page.products);

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1 className="text-4xl font-bold text-gray-800">Load more Store page</h1>
      <ProductList products={products} />
      <div className="flex justify-center my-4">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching || isFetchingNextPage}
          className="
      inline-flex items-center gap-2
      rounded-lg px-6 py-2.5
      bg-blue-600 text-white font-medium
      hover:bg-blue-700
      disabled:bg-gray-300 disabled:text-gray-500
      disabled:cursor-not-allowed
      transition-colors duration-200
      shadow-sm
    "
        >
          {isFetchingNextPage && (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}
          {isFetchingNextPage ? "Loading…" : "Load more"}
        </button>
      </div>
    </main>
  );
}
