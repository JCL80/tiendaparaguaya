import { NavLink } from "./NavLink";

export const NavLinks = async () => {
  const API_URL = process.env.STRAPI_URL + "/api/categories"; // Ensure this matches your Strapi API
  const API_TOKEN = process.env.STRAPI_BACK_TOKEN
  let categories = [];

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    if (!res.ok) throw new Error("Failed to fetch categories");

    const json = await res.json();
    categories = json.data.map((category) => ({
      id: category.id,
      slug: category.attributes.slug,
      name: category.attributes.name,
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return (
    <>
      <NavLink href="/visualizer">Todo</NavLink>

      {/* Render fetched categories */}
      {categories.map((category) => (
        <NavLink key={category.id} href={`/categories/${category.slug}`}>
          {category.name}
        </NavLink>
      ))}

      {/* Keep the "Sobre Nosotros" page */}
      <NavLink href="/pages/sobre-nosotros">Sobre nosotros</NavLink>
    </>
  );
};
