import { formatMoneyRange } from "@/lib/utils";
import xss from "xss";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; channel: string }>;
}) {
  const { slug } = await params; 
  const BASE_URL = "http://localhost:1337";
  const API_URL = `http://localhost:1337/api/posts?populate=*&filters[slug][$eq]=${slug}`;
  const API_TOKEN = process.env.STRAPI_BACK_TOKEN; // Ensure the API token is set in your .env file
  let product = null;

  try {
    // Fetch the specific product using the slug
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      product = data.data?.[0]; // Assuming the product is the first item in the response
    } else {
      console.error(
        `Error fetching product: ${res.status} - ${res.statusText}`
      );
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const sanitizedDescription = product.attributes.description
    ? xss(product.attributes.description).replace(/\n/g, "<br>")
    : "";

  const imageAttributes = product.attributes.images?.data?.[0]?.attributes;
  const formats = imageAttributes?.formats;
  const productAttributes = product.attributes;
  const firstImage = productAttributes.images?.data?.[0];
  const firstImageUrl = formats?.medium?.url
    ? `${BASE_URL}${formats.medium.url}`
    : formats?.small?.url
    ? `${BASE_URL}${formats.small.url}`
    : imageAttributes?.url
    ? `${BASE_URL}${imageAttributes.url}`
    : null;

  console.log("firstImage", firstImage);

  return (
    <section className="mx-auto grid max-w-7xl p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            /* Add your product JSON-LD structure here */
          }),
        }}
      />
      <form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8">
        {/* Image Section */}
        <div className="md:col-span-1 lg:col-span-5">
          {firstImage && firstImageUrl && (
            <ProductImageWrapper
              priority={true}
              alt={firstImage.alternativeText ?? ""}
              width={1024}
              height={1024}
              src={firstImageUrl}
            />
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col pt-6 sm:col-span-1 sm:px-6 sm:pt-0 lg:col-span-3 lg:pt-16">
          <div>
            <h1 className="mb-4 flex-auto text-3xl font-medium tracking-tight text-neutral-900">
              {productAttributes.title}
            </h1>
            <p className="mb-8 text-sm" data-testid="ProductElement_Price">
              {formatMoneyRange({
                start: { amount: productAttributes.price, currency: "PYG" },
                stop: { amount: productAttributes.price, currency: "PYG" },
              })}
            </p>
            <div className="text-green-600 text-sm">In Stock</div>
            <div className="mt-8 space-y-6 text-sm text-neutral-500">
              {sanitizedDescription && (
                <div
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
