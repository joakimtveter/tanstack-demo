import { createFileRoute } from "@tanstack/react-router";

import { useProductsByCategory } from "#/api/useApi";
import ProductList from "#/components/product-list";

export const Route = createFileRoute("/category/$categorySlug")({
  component: RouteComponent,
  head: ({ params: { categorySlug } }) => ({
    meta: [{ title: `${categorySlug} category | Tanstack Query Demo` }],
  }),
});

function RouteComponent() {
  const { categorySlug } = Route.useParams();
  const { data } = useProductsByCategory(categorySlug);

  return (
    <main className="page-wrap px-4 pt-14 pb-8">
      <h1 className="mb-6 text-4xl font-bold">Category: {categorySlug}</h1>
      <ProductList products={data?.products ?? []} />
    </main>
  );
}
