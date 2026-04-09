import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BoxIcon,
  PackageIcon,
  RulerIcon,
  ShieldCheckIcon,
  StarIcon,
  TagIcon,
  TruckIcon,
  UndoIcon,
  WeightIcon,
} from "lucide-react";
import { useState } from "react";

import { useProductByIdQueryOptions } from "#/api/products.api";
import { useProductById } from "#/api/useApi";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Separator } from "#/components/ui/separator";
import { formatCurrency } from "#/utils/currency.utils";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { productId } }) =>
    queryClient.ensureQueryData(useProductByIdQueryOptions(Number(productId))),
  head: ({ loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.title ?? "Product Details"} | Tanstack Query Demo`,
      },
    ],
  }),
});

function RouteComponent() {
  const { productId } = Route.useParams();
  const { data: product, isPending, isError, error } = useProductById(+productId);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (isPending) return <>Loading...</>;
  if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  const mainImage = selectedImage ?? product.thumbnail;

  return (
    <main className="page-wrap px-4 pt-14 pb-8">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Hero section */}
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/2">
            <img
              src={mainImage}
              alt={product.title}
              className="w-full rounded-4xl object-cover shadow-md"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <Link
                to="/category/$categorySlug"
                params={{ categorySlug: product.category }}
                className="text-muted-foreground text-sm tracking-wide uppercase hover:underline"
              >
                {product.category}
              </Link>
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <div className="mt-1 flex items-center gap-1">
                <StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}/5</span>
                <span className="text-muted-foreground text-sm">
                  ({product.reviews.length} reviews)
                </span>
              </div>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
            </div>

            <p className="text-muted-foreground text-sm">{product.stock} in stock</p>

            <Button size="lg" className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Gallery */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`cursor-pointer overflow-hidden rounded-4xl shadow-md ring-2 transition-all ${
                  mainImage === img ? "ring-primary" : "hover:ring-primary/50 ring-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  className="aspect-square w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Details + Reviews side by side on larger screens */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Product Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-3">
                {product.brand && (
                  <DetailRow icon={<TagIcon />} label="Brand" value={product.brand} />
                )}
                <DetailRow icon={<BoxIcon />} label="SKU" value={product.sku} />
                <DetailRow icon={<WeightIcon />} label="Weight" value={`${product.weight} kg`} />
                <DetailRow
                  icon={<RulerIcon />}
                  label="Dimensions"
                  value={`${product.dimensions.width} × ${product.dimensions.height} × ${product.dimensions.depth} cm`}
                />

                <Separator />

                <DetailRow
                  icon={<ShieldCheckIcon />}
                  label="Warranty"
                  value={product.warrantyInformation}
                />
                <DetailRow
                  icon={<TruckIcon />}
                  label="Shipping"
                  value={product.shippingInformation}
                />
                <DetailRow
                  icon={<PackageIcon />}
                  label="Status"
                  value={product.availabilityStatus}
                />
                <DetailRow icon={<UndoIcon />} label="Return Policy" value={product.returnPolicy} />
              </dl>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Reviews ({product.reviews.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.reviews.map((review, i) => (
                <div key={i}>
                  {i > 0 && <Separator className="mb-4" />}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{review.reviewerName}</span>
                      <div className="flex items-center gap-1 text-sm">
                        <StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
                        <span>{review.rating}/5</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    <p className="text-muted-foreground text-xs">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

function DetailRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-muted-foreground [&_svg]:size-4">{icon}</span>
      <dt className="text-muted-foreground w-24 shrink-0 text-sm">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}
