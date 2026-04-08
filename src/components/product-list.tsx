import type { Product } from "#/types/product.types";
import { formatCurrency } from "#/utils/currency.utils";
import { Link } from "@tanstack/react-router";
import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "#/components/ui/card";
import { Button } from "#/components/ui/button";

type ProductListProps = {
  products: Product[];
};

export default function ProductList(props: ProductListProps) {
  const { products } = props;
  return (
      <ul
          className="
        grid
        gap-6
        grid-cols-[repeat(auto-fit,minmax(250px,1fr))]
      "
      >
        {products.map((product) => (
            <ProductCard key={product.id} product={product} />
        ))}
      </ul>
  );
}

type ProductCardProps = {
  product: Product;
};

function ProductCard(props: ProductCardProps) {
  const { product } = props;
  return (
    <li className="list-none">
      <Card>
        <img
          className="w-full h-48 object-cover"
          src={product.images[0]}
          alt="Product Image"
        />

        <CardHeader>
          <CardTitle>
            <Link
              to="/products/$productId"
              params={{ productId: product.id.toString() }}
              className="hover:underline"
            >
              {product.title}
            </Link>
          </CardTitle>
          <CardDescription>
            <Link
              to="/category/$categorySlug"
              params={{ categorySlug: product.category }}
              className="hover:underline"
            >
              {product.category}
            </Link>
          </CardDescription>
        </CardHeader>

        <CardFooter className="justify-between">
          <span className="text-xl font-bold">
            {formatCurrency(product.price)}
          </span>
          <Button size="sm">Add to Cart</Button>
        </CardFooter>
      </Card>
    </li>
  );
}
