import { Header } from "@/components/common/header";
import { ProductsList } from "@/components/common/products-list";
import { db } from "@/db";
import Image from "next/image";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  console.log(products);

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <Image
            src={"/banner-01.png"}
            alt="Leve uma vida com estilo."
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>

        <ProductsList title="Mais vendidos" products={products} />

        <div className="px-5">
          <Image
            src={"/banner-02.png"}
            alt="Leve uma vida com estilo."
            width={0}
            height={0}
            sizes="100vw"
            className="h-auto w-full"
          />
        </div>
      </div>
    </>
  );
}
