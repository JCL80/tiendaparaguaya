import { NavLink } from "./NavLink";

interface Category {
  id: number;
  attributes: {
    slug: string;
    name: string;
  };
}

export const NavLinks = async () => {
  const API_URL = process.env.STRAPI_URL + "/api/categories"; // Ensure this matches your Strapi API
  const API_TOKEN = process.env.STRAPI_BACK_TOKEN;
  let categories: { id: number; slug: string; name: string }[] = [];

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch categories");

    const json = await res.json();
    categories = json.data.map((category: Category) => ({
      id: category.id,
      slug: category.attributes.slug,
      name: category.attributes.name,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <>
      {/* <NavLink href="/visualizer">Todo</NavLink> */}

      {/* Render fetched categories */}
      {categories.slice(0, 4).map((category) => (
        <NavLink key={category.id} href={`/categories/${category.slug}`}>
          {category.name}
        </NavLink>
      ))}

      {/* Keep the "Sobre Nosotros" page */}
      {/* <NavLink href="/pages/sobre-nosotros">Sobre nosotros</NavLink> */}
    </>
  );
};
