import { useProductById } from "#/api/useApi";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { productId } = Route.useParams();
  const {
    data: product,
    isPending,
    isError,
    error,
  } = useProductById(+productId);

  if (isPending) return <>Loading...</>;
  if (isError) return <pre>{JSON.stringify(error, null, 2)}</pre>;

  return (
    <main className="page-wrap px-4 pb-8 pt-14">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full md:w-1/2 rounded-xl shadow"
          />
          <div className="flex-1 space-y-3">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-xl font-semibold">${product.price}</p>
            <p className="text-sm text-gray-600">Stock: {product.stock}</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Image ${i}`}
              className="rounded-lg shadow"
            />
          ))}
        </div>

        {/* Details */}
        <div className="p-4 bg-white rounded-xl shadow space-y-2">
          <h2 className="text-2xl font-semibold">Details</h2>
          <p>Brand: {product.brand}</p>
          <p>Category: {product.category}</p>
          <p>SKU: {product.sku}</p>
          <p>Weight: {product.weight} kg</p>
          <p>
            Dimensions: {product.dimensions.width}×{product.dimensions.height}×
            {product.dimensions.depth} cm
          </p>
          <p>Warranty: {product.warrantyInformation}</p>
          <p>Shipping: {product.shippingInformation}</p>
          <p>Status: {product.availabilityStatus}</p>
          <p>Return Policy: {product.returnPolicy}</p>
        </div>

        {/* Reviews */}
        <div className="p-4 bg-white rounded-xl shadow space-y-4">
          <h2 className="text-2xl font-semibold">Reviews</h2>
          {product.reviews.map((review, i) => (
            <div key={i} className="border-b pb-3">
              <p className="font-semibold">{review.reviewerName}</p>
              <p className="text-yellow-500">Rating: {review.rating} / 5</p>
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-500">{review.date}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
