import { ProductList } from "@/ui/components/ProductList";

export const metadata = {
  title: "Tienda Paraguaya - Te traemos los mejores productos",
  description: "Nuestra misión es traerte los mejores productos de Paraguay",
};

export default async function Home() {

  const API_URL = process.env.STRAPI_URL + "/api/posts?populate=*";
  console.log("API_URL", API_URL)
  // const API_URL = "http://localhost:1337/api/posts?populate=*";
  const API_TOKEN = process.env.STRAPI_BACK_TOKEN // Replace with your actual API token
  let products = []

  try{

    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    const json = await res.json();
    console.log("json", json)
    products = json.data
  
  }catch(err){
    console.log("error", err)
  }
 
  return (
    <section className="mx-auto max-w-7xl p-8 pb-16">
			<h2 className="sr-only">Product list</h2>
			<ProductList products={products} />
		</section>
  );
}
