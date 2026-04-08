import { useProductsByCategory } from "#/api/useApi";
import ProductList from "#/components/product-list";
import { createFileRoute } from "@tanstack/react-router";

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
    <main className="page-wrap px-4 pb-8 pt-14">
      <h1 className="text-4xl font-bold mb-6">Category: {categorySlug}</h1>
      <ProductList products={data?.products ?? []} />
    </main>
  );
}
