import { createFileRoute } from "@tanstack/react-router";

import { useProducts } from "#/api/useApi";
import ProductList from "#/components/product-list";

export const Route = createFileRoute("/")({
  component: App,
  head: () => ({
    meta: [{ title: "Unpaginated example | Tanstack Query Demo" }],
  }),
});

function App() {
  const { data } = useProducts({ limit: 200, skip: 0 });

  return (
    <main className="page-wrap px-4 pt-14 pb-8">
      <h1 className="mb-6 text-4xl font-bold">Unpaginated</h1>
      <ProductList products={data?.products ?? []} />
    </main>
  );
}
