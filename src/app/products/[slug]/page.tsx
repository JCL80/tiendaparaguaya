import { formatMoneyRange } from "@/lib/utils";
import xss from "xss";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";
import { Heart, Info } from "lucide-react";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string; channel: string }>;
}) {
  const isWishlisted = true;
  const isModalOpen = true;
  const { slug } = await params;
  const API_URL = `${process.env.STRAPI_URL}/api/posts?populate=*&filters[slug][$eq]=${slug}`;
  const API_TOKEN = process.env.STRAPI_BACK_TOKEN; // Ensure the API token is set in your .env file
  let product = null;

  const handleWishlist = async () => {
    // const url = isWishlisted ? "/api/wishlist/remove" : "/api/wishlist/add";
    // const method = "POST";
    // await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    //   method,
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${userToken}`,
    //   },
    //   body: JSON.stringify({ productId: product.id }),
    // });
    // setIsWishlisted(!isWishlisted);
  };

  try {
    // Fetch the specific product using the slug
    const res = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    if (res.ok) {
      const data = await res.json();
      product = data.data?.[0]; // Assuming the product is the first item in the response
    } else {
      console.error(
        `Error fetching product: ${res.status} - ${res.statusText}`
      );
    }
  } catch (error) {
    console.error("Error fetching product:", error);
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const sanitizedDescription = product.attributes.description
    ? xss(product.attributes.description).replace(/\n/g, "<br>")
    : "";

  const imageAttributes = product.attributes.images?.data?.[0]?.attributes;
  const formats = imageAttributes?.formats;
  const productAttributes = product.attributes;
  const firstImage = productAttributes.images?.data?.[0];
  const firstImageUrl = formats?.medium?.url
    ? formats.medium.url // ✅ Use absolute URL directly
    : formats?.small?.url
    ? formats.small.url // ✅ Use absolute URL directly
    : imageAttributes?.url
    ? imageAttributes.url // ✅ Use absolute URL directly
    : null;

  console.log("firstImage", firstImage);

  return (
    <section className="mx-auto grid max-w-7xl p-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            /* Add your product JSON-LD structure here */
          }),
        }}
      />
      <form className="grid gap-2 sm:grid-cols-2 lg:grid-cols-8">
        {/* Image Section */}
        <div className="md:col-span-1 lg:col-span-5">
          {firstImage && firstImageUrl && (
            <ProductImageWrapper
              priority={true}
              alt={firstImage.alternativeText ?? ""}
              width={1024}
              height={1024}
              src={firstImageUrl}
            />
          )}
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col pt-6 sm:col-span-1 sm:px-6 sm:pt-0 lg:col-span-3 lg:pt-16">
          <div>
            <h1 className="mb-4 flex-auto text-3xl font-medium tracking-tight text-neutral-900">
              {productAttributes.title}
            </h1>
            <p className="mb-8 text-sm" data-testid="ProductElement_Price">
              {formatMoneyRange({
                start: { amount: productAttributes.price, currency: "PYG" },
                stop: { amount: productAttributes.price, currency: "PYG" },
              })}
            </p>
            <div className="text-green-600 text-sm">En Stock</div>
            <div className="mt-8 space-y-6 text-sm text-neutral-500">
              {sanitizedDescription && (
                <div
                  dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
                />
              )}
            </div>
            <div className="mt-8 text-gray-600 text-sm flex items-center gap-2">
              <Info className="w-4 h-4" />
              <button
                type="button"
                // onClick={toggleModal}
                className="underline hover:text-gray-800"
              >
                ¿Qué es una lista de deseos?
              </button>
            </div>
            <button
              // onClick={handleWishlist}
              className={`mt-4 flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg 
              ${
                isWishlisted
                  ? "bg-white-500 text-green-800 border border-green-300"
                  : "bg-gray-100 text-gray-700"
              } 
              hover:${isWishlisted ? "bg-red-600/20" : "bg-gray-200"} 
              transition-all duration-200 ease-in-out`}
            >
              <Heart
                className={`mr-2 ${
                  isWishlisted ? "fill-current text-white" : "text-gray-700"
                }`}
                style={{ color: isWishlisted ? "#10B981" : "" }} // Green heart color when wishlisted
              />
              {isWishlisted
                ? "En tu lista de deseos"
                : "Agregar a la lista de deseos"}
            </button>
          </div>
        </div>
      </form>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
            <h2 className="text-lg font-medium mb-4">
              ¿Qué es una lista de deseos?
            </h2>
            <p className="text-sm text-gray-600">
              Una lista de deseos es una forma de guardar tus productos
              favoritos para comprarlos más tarde. Puedes agregar cualquier
              producto a tu lista de deseos y regresar a ellos cuando estés
              listo para completar tu compra. ¡Es una herramienta útil para
              planificar tus compras!
            </p>
            <p className="text-sm text-gray-600 mt-4">
              Además, podemos ayudarte a encontrar productos similares a los que
              has agregado a tu lista de deseos. ¿Te gustaría explorar estas
              recomendaciones personalizadas?
            </p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                // onClick={toggleModal}
                className="px-4 py-2 text-sm font-medium bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200"
              >
                Cerrar
              </button>
              <button
                // onClick={() => {
                //   toggleModal();
                //   // Logic for navigating to recommendations or triggering API here
                // }}
                className="px-4 py-2 text-sm font-medium bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-200"
              >
                Explorar recomendaciones
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
