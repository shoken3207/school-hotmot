import prisma from '../lib/prisma';
import { CartDetail } from '../types/model/CartDetail';

const fetchCartDetailById = async (id: number): Promise<CartDetail | null> => {
  const CartDetail: CartDetail | null = await prisma.cartDetail.findUnique({
    where: { id },
  });
  return CartDetail;
};

const fetchCartDetail = async (args: {
  cartId: number;
  productId: number;
  riceId: number;
}): Promise<CartDetail | null> => {
  const { cartId, productId, riceId } = args;
  const CartDetail: CartDetail | null = await prisma.cartDetail.findFirst({
    where: { cartId, productId, riceId },
  });
  return CartDetail;
};

const fetchCartDetailsByCartId = async (
  cartId: number
): Promise<CartDetail[]> => {
  const cartDetails: CartDetail[] = await prisma.cartDetail.findMany({
    where: { cartId },
  });
  return cartDetails;
};

const createCartDetail = async (args: {
  cartId: number;
  productId: number;
  riceId: number;
  quantity: number;
}): Promise<void> => {
  await prisma.cartDetail.create({ data: args });
};

const updateCartDetail = async (args: {
  id: number;
  quantity: number;
}): Promise<void> => {
  const { id, quantity } = args;
  await prisma.cartDetail.update({ data: { quantity }, where: { id } });
};

const deleteCartDetail = async (args: { id: number }): Promise<void> => {
  const { id } = args;
  await prisma.cartDetail.delete({ where: { id } });
};

export {
  fetchCartDetailById,
  fetchCartDetail,
  fetchCartDetailsByCartId,
  createCartDetail,
  updateCartDetail,
  deleteCartDetail,
};
