import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "../atoms/ProductImageWrapper";
import { formatMoneyRange } from "@/lib/utils";

// Define the inline types for your product fragment

// The shape of an image attached to a product
type ProductImage = {
  url?: string;
  alternativeText?: string;
  formats?: {
    medium?: { url: string };
    small?: { url: string };
  };
};

// The shape of the category attached to a product
type Category = {
  name: string;
};

// The shape of the product attributes
type ProductAttributes = {
  slug: string;
  title: string;
  price: number;
  images?: {
    data?: Array<{
      attributes?: ProductImage;
    }>;
  };
  category?: Category;
};

// The inline type for a product list item fragment
type ProductListItemFragment = {
  id: string;
  attributes: ProductAttributes;
};

type Props = { product: ProductListItemFragment } & {
  loading: "eager" | "lazy";
  priority?: boolean;
};

export function ProductElement({ product, loading, priority }: Props) {
  const BASE_URL = "http://localhost:1337";

  // Access the product attributes
  const productAttributes = product.attributes;

  // Get the image data from the first image (if any)
  const imagesData = productAttributes.images?.data;
  const imageAttributes = imagesData?.[0]?.attributes;
  const formats = imageAttributes?.formats;

  // Determine the image URL based on available formats
  const imageUrl = formats?.medium?.url
    ? `${BASE_URL}${formats.medium.url}`
    : formats?.small?.url
    ? `${BASE_URL}${formats.small.url}`
    : imageAttributes?.url
    ? `${BASE_URL}${imageAttributes.url}`
    : null;

  return (
    <li data-testid="ProductElement">
      <LinkWithChannel href={`/products/${productAttributes.slug}`} key={product.id}>
        <div>
          {/* Only render the image if imageUrl is not null */}
          {imageUrl && (
            <ProductImageWrapper
              loading={loading}
              src={imageUrl}
              alt={
                productAttributes.images?.data?.[0]?.attributes?.alternativeText ??
                "Product image"
              }
              width={512}
              height={512}
              sizes="512px"
              priority={priority}
            />
          )}
          <div className="mt-2 flex justify-between">
            <div>
              <h3 className="mt-1 text-sm font-semibold text-neutral-900">
                {productAttributes.title}
              </h3>
              <p className="mt-1 text-sm text-neutral-500" data-testid="ProductElement_Category">
                {productAttributes.category?.name}
              </p>
            </div>
            <p className="mt-1 text-sm font-medium text-neutral-900" data-testid="ProductElement_PriceRange">
              {formatMoneyRange({
                start: { amount: productAttributes.price, currency: "PYG" },
                stop: { amount: productAttributes.price, currency: "PYG" },
              })}
            </p>
          </div>
        </div>
      </LinkWithChannel>
    </li>
  );
}
