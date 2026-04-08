import { createFileRoute } from "@tanstack/react-router";

import { useInfinateProducts } from "#/api/useApi";
import ProductList from "#/components/product-list";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";

export const Route = createFileRoute("/load-more")({
  component: RouteComponent,
  head: () => ({
    meta: [{ title: "Manual infinite query example | Tanstack Query Demo" }],
  }),
});

function RouteComponent() {
  const { data, error, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage, status } =
    useInfinateProducts();

  if (status === "pending") return <div>Loading ...</div>;
  if (status === "error") return <div>{JSON.stringify(error)}</div>;

  const products = data?.pages.flatMap((page) => page.products);

  return (
    <main className="page-wrap px-4 pt-14 pb-8">
      <h1 className="mb-6 text-4xl font-bold">Load more Store page</h1>
      <ProductList products={products} />
      <div className="my-4 flex justify-center">
        <Button
          size="lg"
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetching || isFetchingNextPage}
        >
          {isFetchingNextPage && <Spinner />}
          {isFetchingNextPage ? "Loading…" : "Load more"}
        </Button>
      </div>
    </main>
  );
}
