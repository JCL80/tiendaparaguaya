/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import { ProductList } from "@/ui/components/ProductList";

export default async function RecommendedProducts() {
  const API_URL = process.env.STRAPI_URL + "/api/posts?populate=*";
  const API_TOKEN = process.env.STRAPI_BACK_TOKEN; // Replace with your actual API token

  const res = await fetch(API_URL, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  const json = await res.json();
  const products = json.data;

  if (!products) {
    notFound();
  }

  // Filter products for featured and favorites like in your main page.
  const featuredProducts = products.filter(
    (product: any) => product.attributes.featured
  );
  const favoriteProducts = products.filter(
    (product: any) => product.attributes.favorites
  );
  return (
    <div>
      <h1 className="py-8 text-xl font-semibold">Nuestros productos destacados:</h1>
      <ProductList products={featuredProducts} />
      <h1 className="py-8 text-xl font-semibold">Nuestros productos favoritos:</h1>
      <ProductList products={favoriteProducts} />

    </div>
  );
}
