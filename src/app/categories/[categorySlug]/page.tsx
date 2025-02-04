import { ProductList } from "@/ui/components/ProductList";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categorySlug: string; subcategorySlug: string }>;
}) {
  const { categorySlug } = await params;
  console.log("categorySlug", categorySlug);
  console.log("params",  await params);
  const API_URL = `${process.env.STRAPI_URL}/api/posts?filters[category][slug][$eq]=${categorySlug}&populate=*`;
  console.log("API_URL", API_URL);
  const API_TOKEN = process.env.STRAPI_BACK_TOKEN; // Replace with your actual API token
  let products = [];
  let categoryName = "";

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    const json = await res.json();
    products = json.data;

    if (products.length > 0) {
      categoryName = products[0].attributes.category.data.attributes.name;
    }
    console.log("products xa", products);
  } catch (err) {
    console.error("Error fetching products:", err);
  }

  return (
    <section className="mx-auto max-w-7xl p-8 pb-16">
      <h1 className="text-2xl font-normal mb-4">Productos en categoría: <span className="font-bold">{categoryName}</span></h1>
      <div className="space-y-4">
        <ProductList products={products} />
      </div>
    </section>
  );
}
