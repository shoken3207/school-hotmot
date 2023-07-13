import prisma from '../lib/prisma';
import { OrderDetail } from '../types/model/OrderDetail';

const fetchOrderDetailById = async (
  id: number
): Promise<OrderDetail | null> => {
  const OrderDetail: OrderDetail | null = await prisma.orderDetail.findUnique({
    where: { id },
  });
  return OrderDetail;
};

const fetchOrderDetailsByOrderId = async (
  orderId: number
): Promise<OrderDetail[]> => {
  const OrderDetails: OrderDetail[] = await prisma.orderDetail.findMany({
    where: { orderId },
  });
  return OrderDetails;
};

const createOrderDetail = async (args: {
  orderId: number;
  productId: number;
  riceId: number;
  quantity: number;
}): Promise<void> => {
  await prisma.orderDetail.create({ data: args });
};

const deleteOrderDetail = async (args: { id: number }): Promise<void> => {
  const { id } = args;
  await prisma.orderDetail.delete({ where: { id } });
};

export {
  fetchOrderDetailById,
  fetchOrderDetailsByOrderId,
  createOrderDetail,
  deleteOrderDetail,
};
