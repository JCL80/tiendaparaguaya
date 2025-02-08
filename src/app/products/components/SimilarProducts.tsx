interface Product {
    id: number;
    title: string;
    slug: string | null;
    price: number;
    images?: Array<{
      url?: string;
      formats?: {
        thumbnail?: { url: string };
      };
    }>;
    category?: {
      id: number;
      name: string;
      slug: string;
    };
  }
  
  interface SimilarProductsProps {
    products: Product[];
  }
  

  export default function SimilarProducts({ products }: SimilarProductsProps) {
    if (!products || products.length === 0) {
      return null; // If no similar products, return nothing
    }
  
    return (
      <section className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Productos Similares</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => {
            const imageUrl =
              product.images?.[0]?.formats?.thumbnail?.url || product.images?.[0]?.url;
  
            return (
              <div key={product.id} className="border rounded-lg p-4 hover:shadow-lg">
                <a href={`/product/${product.slug}`} className="block">
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt={product.title || "Imagen del producto"}
                      className="w-full h-auto mb-4 rounded-lg"
                    />
                  )}
                  <h3 className="text-lg font-medium text-neutral-900">{product.title}</h3>
                  <p className="text-sm text-gray-600">
                    {product.price?.toLocaleString("es-PY", {
                      style: "currency",
                      currency: "PYG",
                    })}
                  </p>
                </a>
              </div>
            );
          })}
        </div>
      </section>
    );
  }
  