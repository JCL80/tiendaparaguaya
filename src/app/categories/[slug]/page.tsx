import { ProductList } from "@/ui/components/ProductList";

export default async function CategoryPage({
  params,
}: {
  params: { categorySlug: string; subcategorySlug: string };
}) {
  const { subcategorySlug } = await params;
  const API_URL = `http://localhost:1337/api/posts?filters[category][slug][$eq]=${subcategorySlug}`;
  const API_TOKEN = process.env.STRAPI_BACK_TOKEN; // Replace with your actual API token
  let products = [];

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    const json = await res.json();
    products = json.data;
    // console.log("products", products.length);
  } catch (err) {
    console.error("Error fetching products:", err);
  }

  return (
    <section className="mx-auto max-w-7xl p-8 pb-16">
      <h1 className="text-2xl font-bold mb-4">Productos en Categoría: </h1>
      <div className="space-y-4">
        <ProductList products={products} />
      </div>
    </section>
  );
}
