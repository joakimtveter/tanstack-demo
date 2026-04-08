import { useProducts } from "#/api/useApi";
import ProductList from "#/components/product-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: App,
  head: () => ({
    meta: [{ title: "Unpaginated example | Tanstack Query Demo" }],
  }),
});

function App() {
  const { data } = useProducts({ limit: 200, skip: 0 });

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1 className="text-4xl font-bold mb-6">Unpaginated</h1>
      <ProductList products={data?.products ?? []} />
    </main>
  );
}
