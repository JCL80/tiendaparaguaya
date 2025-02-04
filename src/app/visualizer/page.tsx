/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";

export const metadata = {
  title: "Visualizador · Tienda Paraguaya",
  description: "Visualizador de categorías y subcategorías",
};

export default async function Page({}) {
  const API_URL = `${process.env.STRAPI_URL}/api/categories?populate=subcategories`;
  const API_TOKEN = process.env.STRAPI_BACK_TOKEN; // Replace with your actual API token
  let categories = [];

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    const json = await res.json();
    categories = json.data;
  } catch (err) {
    console.error("Error fetching categories:", err);
  }

  return (
    <section className="mx-auto max-w-7xl p-8 pb-16">
      <h1 className="text-2xl font-bold mb-4">
        Navega nuestras categorías y subcategorías
      </h1>
      <div className="space-y-8">
        {categories &&
          categories.map((category: any) => (
            <div key={category.id} className="border p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">
                <Link href={`/categories/${category.attributes.slug}`}>
                  <span className="font-normal">Categoria: </span>
                  {category.attributes.name}
                </Link>
              </h2>
              {category.attributes.description && (
                <p className="text-gray-600 mb-2">
                  {category.attributes.description}
                </p>
              )}
              {category.attributes.subcategories.lenght > 0 && (
                <h3 className="text-lg font-semibold mt-4 border-b border-black">
                  Subcategorías:
                </h3>
              )}
              <ul className="list-none mt-2 space-y-1">
                {category.attributes.subcategories.data.map(
                  (subcategory: any) => (
                    <li key={subcategory.id}>
                      <Link
                        href={`/categories/${category.attributes.slug}/subcategories/${subcategory.attributes.slug}`}
                        className="hover:underline"
                      >
                        {subcategory.attributes.name}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
      </div>
    </section>
  );
}
