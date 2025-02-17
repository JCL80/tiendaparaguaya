/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
  title: "Tienda Paraguaya - Te traemos los mejores productos",
  description: "Nuestra misión es traerte los mejores productos de Paraguay",
};

export default async function Home() {

  const API_URL = process.env.STRAPI_URL + "/api/posts?populate=*";
  const API_TOKEN = process.env.STRAPI_BACK_TOKEN // Replace with your actual API token
  let products = []

  try{

    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    const json = await res.json();
    products = json.data
  
  }catch(err){
    console.log("error", err)
  }

  const featuredProducts = products.filter((product  : any) => product.attributes.featured);
  const favoriteProducts = products.filter((product: any) => product.attributes.favorites);
 
  return (
    <section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">Product list</h2>
      {featuredProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Destacados</h2>
          <ProductList products={featuredProducts} />
        </div>
      )}

      {favoriteProducts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Favoritos</h2>
          <ProductList products={favoriteProducts} />
        </div>
      )}
          <h2 className="text-2xl font-bold mb-4">Nuestros productos</h2>

			<ProductList products={products} />
		</section>
  );
}
