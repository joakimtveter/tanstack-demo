import { useProductByIdQueryOptions } from "#/api/products.api";
import { useProductById } from "#/api/useApi";
import { formatCurrency } from "#/utils/currency.utils";
import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import { Separator } from "#/components/ui/separator";
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

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
  loader: ({ context: { queryClient }, params: { productId } }) =>
    queryClient.ensureQueryData(useProductByIdQueryOptions(Number(productId))),
  head: ({ loaderData }) => ({
    meta: [{ title: `${loaderData?.title ?? "Product Details"} | Tanstack Query Demo` }],
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
    <main className="page-wrap px-4 pb-8 pt-14">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Hero section */}
        <div className="flex flex-col md:flex-row gap-8">
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
                className="text-sm text-muted-foreground hover:underline uppercase tracking-wide"
              >
                {product.category}
              </Link>
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <div className="flex items-center gap-1 mt-1">
                <StarIcon className="size-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}/5</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews.length} reviews)
                </span>
              </div>
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold">{formatCurrency(product.price)}</span>
            </div>

            <p className="text-sm text-muted-foreground">{product.stock} in stock</p>

            <Button size="lg" className="w-full">
              Add to Cart
            </Button>
          </div>
        </div>

        {/* Gallery */}
        {product.images.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedImage(img)}
                className={`rounded-4xl shadow-md overflow-hidden cursor-pointer ring-2 transition-all ${
                  mainImage === img ? "ring-primary" : "ring-transparent hover:ring-primary/50"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.title} ${i + 1}`}
                  className="object-cover aspect-square w-full"
                />
              </button>
            ))}
          </div>
        )}

        {/* Details + Reviews side by side on larger screens */}
        <div className="grid md:grid-cols-2 gap-8">
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
                    <p className="text-xs text-muted-foreground">
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
      <dt className="text-sm text-muted-foreground w-24 shrink-0">{label}</dt>
      <dd className="text-sm font-medium">{value}</dd>
    </div>
  );
}
