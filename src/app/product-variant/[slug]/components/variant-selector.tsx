"use client";

import { productVariantTable } from "@/db/schema";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface VariantSelectorProps {
  selectedVariantSlug: string;
  variants: (typeof productVariantTable.$inferInsert)[];
}

const VariantSelector = ({ variants }: VariantSelectorProps) => {
  const { slug } = useParams();

  return (
    <div className="flex items-center gap-4">
      {variants.map((variant) => (
        <Link
          href={`/product-variant/${variant.slug}`}
          key={variant.id}
          className={
            slug === variant.slug
              ? "border-primary rounded-xl border border-solid"
              : ""
          }
        >
          <Image
            src={variant.imageUrl}
            width={68}
            height={68}
            alt={variant.name}
            className="rounded-xl"
          />
        </Link>
      ))}
    </div>
  );
};

export default VariantSelector;
