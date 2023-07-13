import prisma from '../lib/prisma';
import { Cart } from '../types/model/Cart';

const fetchCartById = async (id: number): Promise<Cart | null> => {
  const cart: Cart | null = await prisma.cart.findUnique({
    where: { id },
  });
  return cart;
};

const fetchCartByUserId = async (userId: number): Promise<Cart | null> => {
  const cart: Cart | null = await prisma.cart.findUnique({
    where: { userId },
  });
  return cart;
};

const fetchCart = async (args: {
  userId: number;
  shopId: number;
}): Promise<Cart | null> => {
  const { userId, shopId } = args;
  const cart: Cart | null = await prisma.cart.findFirst({
    where: { userId, shopId },
  });
  return cart;
};

const createCart = async (args: {
  userId: number;
  shopId: number;
}): Promise<void> => {
  await prisma.cart.create({ data: args });
};

const updateCart = async (args: {
  id: number;
  shopId: number;
}): Promise<void> => {
  const { id, shopId } = args;
  await prisma.cart.update({ data: { shopId }, where: { id } });
};

const deleteCart = async (args: { id: number }): Promise<void> => {
  const { id } = args;
  await prisma.cart.delete({ where: { id } });
};

export {
  fetchCartById,
  fetchCartByUserId,
  fetchCart,
  createCart,
  updateCart,
  deleteCart,
};
