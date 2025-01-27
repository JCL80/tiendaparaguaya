import { NavLink } from "./NavLink";

export const NavLinks = async () => {
  const mockNavLinks = {
    menu: {
      items: [
        { id: "1", category: { slug: "electronicos", name: "Electrónicos" } },
        { id: "2", category: { slug: "muebles", name: "Muebles" } },
        { id: "3", page: { slug: "sobre-nosotros", title: "Sobre nosotros" } },
      ],
    },
  };

  const navLinks = mockNavLinks;

  return (
    <>
      <NavLink href="/visualizer">Todo</NavLink>
      {navLinks.menu?.items?.map((item) => {
        if (item.category) {
          return (
            <NavLink key={item.id} href={`/categories/${item.category.slug}`}>
              {item.category.name}
            </NavLink>
          );
        }
        // if (item.collection) {
        //   return (
        //     <NavLink key={item.id} href={`/collections/${item.collection.slug}`}>
        //       {item.collection.name}
        //     </NavLink>
        //   );
        // }
        if (item.page) {
          return (
            <NavLink key={item.id} href={`/pages/${item.page.slug}`}>
              {item.page.title}
            </NavLink>
          );
        }
        return null;
      })}
    </>
  );
};
