import { LinkWithChannel } from "../atoms/LinkWithChannel";
import { ProductImageWrapper } from "../atoms/ProductImageWrapper";

import type { ProductListItemFragment } from "@/gql/graphql";
import { formatMoneyRange } from "@/lib/utils";

export function ProductElement({
	product,
	loading,
	priority,
}: { product: ProductListItemFragment } & { loading: "eager" | "lazy"; priority?: boolean }) {
    const BASE_URL = "http://localhost:1337"

	// console.log("product", product)
	const productAttributes = product.attributes
	// console.log("productAttributes", productAttributes)

	const imagesData = productAttributes.images?.data; 
	const imageAttributes = imagesData?.[0]?.attributes;
	const formats = imageAttributes?.formats;
	
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
					{/* {product?.thumbnail?.url && (
						<ProductImageWrapper
							loading={loading}
							src={product.thumbnail.url}
							alt={product.thumbnail.alt ?? ""}
							width={512}
							height={512}
							sizes={"512px"}
							priority={priority}
						/>
					)} */}
                    {imageUrl && (
						<ProductImageWrapper
							loading={loading}
							src={imageUrl}
							alt={productAttributes.images?.[0]?.alternativeText ?? "Product image"}
							width={512}
							height={512}
							sizes={"512px"}
							priority={priority}
						/>
					)}
					<div className="mt-2 flex justify-between">
						<div>
							<h3 className="mt-1 text-sm font-semibold text-neutral-900">{productAttributes.title}</h3>
							<p className="mt-1 text-sm text-neutral-500" data-testid="ProductElement_Category">
								{productAttributes.category?.name}
							</p>
						</div>
						<p className="mt-1 text-sm font-medium text-neutral-900" data-testid="ProductElement_PriceRange">
							{/* {formatMoneyRange({
								start: product?.pricing?.priceRange?.start?.gross,
								stop: product?.pricing?.priceRange?.stop?.gross,
							})} */}
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