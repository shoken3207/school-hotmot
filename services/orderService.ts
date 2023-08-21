import prisma from '../lib/prisma';
import { Order } from '../types/model/Order';

const fetchOrderById = async (id: number): Promise<Order | null> => {
  const Order: Order | null = await prisma.order.findUnique({
    where: { id },
  });
  return Order;
};

const fetchOrdersByUserId = async (userId: number): Promise<Order[]> => {
  const orders: Order[] = await prisma.order.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
  });
  return orders;
};

const createOrder = async (args: {
  userId: number;
  shopId: number;
}): Promise<Order> => {
  const order: Order = await prisma.order.create({
    data: { ...args },
  });
  return order;
};

const deleteOrder = async (args: { id: number }): Promise<void> => {
  const { id } = args;
  await prisma.order.delete({ where: { id } });
};

export { fetchOrderById, fetchOrdersByUserId, createOrder, deleteOrder };
