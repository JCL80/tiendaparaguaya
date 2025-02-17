import { notFound, redirect } from "next/navigation";
import { ProductList } from "@/ui/components/ProductList";
import RecommendedProducts from "./components/RecommendedProducts";

export const metadata = {
  title: "Búsqueda · Tienda Paraguaya",
  description: "Busca products en Tienda Paraguaya",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string | string[]; cursor?: string | string[] }>;
}) {
  // Await the searchParams promise before using its properties
  const resolvedSearchParams = await searchParams;
  console.log("****** resolvedSearchParams", resolvedSearchParams);

  const searchValue = resolvedSearchParams.query;
  console.log("****** searchValue", searchValue);

  const API_URL = process.env.STRAPI_URL + "/api/posts?populate=*";
  const API_TOKEN = process.env.STRAPI_BACK_TOKEN; // Replace with your actual API token

  if (!searchValue) {
    notFound();
  }

  if (Array.isArray(searchValue)) {
    const firstValidSearchValue = searchValue.find((v) => v.length > 0);
    if (!firstValidSearchValue) {
      notFound();
    }
    redirect(
      `/search?${new URLSearchParams({
        query: firstValidSearchValue,
      }).toString()}`
    );
  }
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

  return (
    <section className="mx-auto max-w-7xl p-8 pb-16">
      {products && products.length > 0 ? (
        <div>
          <h1 className="pb-8 text-xl font-semibold">
            Resultados de busqueda para <span className="font-normal">&quot;{searchValue}&quot;</span>:
          </h1>
          <ProductList products={products} />
          {/* <Pagination
            pageInfo={{
              ...products.pageInfo,
              basePathname: `/search`,
              urlSearchParams: newSearchParams,
            }}
          /> */}
        </div>
      ) : (
        <h1 className="mx-auto pb-8 text-center text-xl font-semibold">
          No encontramos nada :(
        </h1>
      )}
      <RecommendedProducts />
    </section>
  );
}
