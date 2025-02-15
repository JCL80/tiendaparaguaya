import { ProductList } from "@/ui/components/ProductList";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const API_URL = `${process.env.STRAPI_URL}/api/wishlists?filters[user][id][$eq]=${id}&populate[posts][populate]=*`;
  const API_TOKEN = process.env.STRAPI_BACK_TOKEN;
  let wishlist = null;

  try {
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      wishlist = data.data[0]?.attributes;
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return <section>Error loading wishlist</section>;
  }

  if (!wishlist) {
    return <section>No wishlist found</section>;
  }

  // Transform the `posts` data into `ProductListItemFragment` format
  const products = wishlist.posts.data.map((post: any) => ({
    id: post.id,
    attributes: {
      slug: post.attributes.slug,
      title: post.attributes.title,
      price: Number(post.attributes.price),
      images: {
        data: [
          {
            attributes: {
              url: post.attributes.images?.data?.[0]?.attributes?.url,
              formats: post.attributes.images?.data?.[0]?.attributes?.formats,
            },
          },
        ],
      },
      category: { name: post.attributes.post_origin }, // Use `post_origin` as the category name
    },
  }));

  return (
    <section className="mx-auto grid max-w-7xl p-8">
      <h1 className="text-2xl font-bold mb-4">Mi Lista de Deseos</h1>
      <ProductList products={products} />
    </section>
  );
}
