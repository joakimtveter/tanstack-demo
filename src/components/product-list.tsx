import type { Product } from "#/types/product.types";
import ProductCard from "#/components/product-card";

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
