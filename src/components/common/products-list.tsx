"use client";

import { productTable, productVariantTable } from "@/db/schema";
import { ProductsItem } from "./products-item";

interface ProductsListProps {
  title: string;
  products: (typeof productTable.$inferSelect & {
    variants: (typeof productVariantTable.$inferSelect)[];
  })[];
}

export function ProductsList({ products, title }: ProductsListProps) {
  return (
    <div className="space-y-6">
      <h3 className="px-5 font-semibold">{title}</h3>
      <div className="no-scrollbar flex w-full gap-4 overflow-x-auto px-5">
        {products.map((products) => (
          <ProductsItem key={products.id} product={products} />
        ))}
      </div>
    </div>
  );
}
