import type { Product } from "#/types/product.types";
import { formatCurrency } from "#/utils/currency.utils";
import { Link } from "@tanstack/react-router";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard(props: ProductCardProps) {
  const { product } = props;
  return (
    <li>
      <div
        className="relative max-w-sm rounded-xl overflow-hidden shadow-md bg-white
                   isolation-auto group"
      >
        <img
          className="w-full h-48 object-cover"
          src={product.images[0]}
          alt="Product Image"
        />

        <div className="p-4 relative z-10">
          <Link
            to="/products/$productId"
            params={{ productId: product.id.toString() }}
            className="text-lg font-semibold text-gray-800 hover:underline"
          >
            {product.title}
          </Link>

          <div className="mt-1">
            <Link
              to="/category/$categorySlug"
              params={{ categorySlug: product.category }}
              className="text-sm text-blue-600 hover:underline relative z-20"
            >
              {product.category}
            </Link>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900">
              {formatCurrency(product.price)}
            </span>

            <button
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg 
                         hover:bg-blue-700 transition relative z-20"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
