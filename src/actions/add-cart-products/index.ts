"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { addProductToCartSchema, AddProductToCartSchema } from "./schema";
import { db } from "@/db";
import { cartItemTable, cartTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const addProductToCart = async (data: AddProductToCartSchema) => {
  // verifica os dados de produto são válidos
  addProductToCartSchema.parse(data);
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if(!session?.user){
    throw new Error("Unauthorized")
  }
  // Verifica se produto existe no DB
  const productVariant = await db.query.productVariantTable.findFirst({
    where: (productVariant, {eq}) => 
      eq(productVariant.id, data.productVariantId),
    
  })
  if(!productVariant){
    throw new Error("Product variant not found")
  }
  // Consulta o carrinho do usuario
  const cart = await db.query.cartTable.findFirst({
    where: (cart, {eq}) => eq(cart.userId, session.user.id),
  })
  // Verifica se usuário possui um carrinho
  let cartId = cart?.id
  if(!cartId) {
    const [newCart] = await db.insert(cartTable).values({
      userId: session.user.id,
    }).returning();
    cartId = newCart.id
  }
  // Verificar se a variante já existe no carrinho
  const cartItem = await db.query.cartItemTable.findFirst({
    where: (cartItem, {eq}) => 
      eq(cartItem.cartId, cartId) &&
      eq(cartItem.productVariantId, data.productVariantId),
  })
  if(cartItem){
    await db.update(cartItemTable)
      .set({
        quantity: cartItem.quantity + data.quantity
    })
      .where(eq(cartItemTable.id, cartItem.id))
      return;
  }
  await db.insert(cartItemTable).values({
    cartId,
    productVariantId: data.productVariantId,
    quantity: data.quantity
  })
};