import { ProductElement } from "./ProductElement";

// Inline type definitions for product data
type ProductImage = {
  url?: string;
  alternativeText?: string;
  formats?: {
    medium?: { url: string };
    small?: { url: string };
  };
};

type Category = {
  name: string;
};

type ProductAttributes = {
  slug: string;
  title: string;
  price: number;
  images?: {
    data?: Array<{ attributes?: ProductImage }>;
  };
  category?: Category;
};

export type ProductListItemFragment = {
  id: string;
  attributes: ProductAttributes;
};

export const ProductList = ({
  products,
}: {
  products: readonly ProductListItemFragment[];
}) => {
  return (
    <ul
      role="list"
      data-testid="ProductList"
      className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {products && products.map((product, index) => (
        <ProductElement
          key={product.id}
          product={product}
          priority={index < 2}
          loading={index < 3 ? "eager" : "lazy"}
        />
      ))}
    </ul>
  );
};
