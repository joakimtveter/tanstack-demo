import { useAddProduct } from "#/api/useApi";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/add")({
  component: RouteComponent,
});

function RouteComponent() {
  const { mutate } = useAddProduct();

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1 className="text-4xl font-bold text-gray-800">Add product</h1>

      <button onClick={() => mutate()}>Create Product</button>
    </main>
  );
}
