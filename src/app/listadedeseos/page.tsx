import { formatMoneyRange } from "@/lib/utils";
import xss from "xss";
import { ProductImageWrapper } from "@/ui/atoms/ProductImageWrapper";

export default async function Page({
  params,
}: {
  params: { slug: string; channel: string };
}) {
  const { slug } = params; // Get the slug from params

  return (
    <section className="mx-auto grid max-w-7xl p-8">
      Lista de deseos
      
    </section>
  );
}
