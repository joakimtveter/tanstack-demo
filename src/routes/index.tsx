import { useProducts } from "#/api/useApi";
import ProductList from "#/components/product-list";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const { data } = useProducts();

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1 className="text-4xl font-bold text-gray-800">Test Store</h1>
      <ProductList products={data?.products ?? []} />
    </main>
  );
}
