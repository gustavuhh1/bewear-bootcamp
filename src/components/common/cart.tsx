"use client"

import { ShoppingBasketIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useQuery } from "@tanstack/react-query";
import { getCart } from "@/actions/get-card";
import Image from "next/image";

export const Cart = () => {
  const {data: cart, isPending: cartIsLoading} = useQuery({
    queryKey: ["cart"],
    queryFn: () => getCart(),

  })

  return (
    <Sheet>
      <SheetTitle></SheetTitle>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <ShoppingBasketIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>Carrinho</SheetHeader>
        <div>
          {cartIsLoading && <div>Carregando...</div>}
          {cart?.items.map((item) => (
            <div key={item.id}>
              <Image
              src={item.productVariant.imageUrl}
              alt={item.productVariant.name}
              width={100}
              height={100}/>
            <div>
              <h3>{item.productVariant.name}</h3>
            </div>
            </div>
          ))}
        </div>

      </SheetContent>
    </Sheet>
  );
};

