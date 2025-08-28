import { CategorySelector } from "@/components/common/category-selector";
import { Footer } from "@/components/common/footer";
import { Header } from "@/components/common/header";
import { ProductsList } from "@/components/common/products-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";
import { desc } from "drizzle-orm";
import Image from "next/image";

export default async function Home() {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProdcts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });

  const categories = await db.query.categoryTable.findMany();

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
          <CategorySelector categories={categories} />
        </div>

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

        <ProductsList title="Novos produtos" products={newlyCreatedProdcts} />
        <Footer />
      </div>
    </>
  );
}
