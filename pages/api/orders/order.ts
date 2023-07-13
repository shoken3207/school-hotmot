import type { NextApiRequest, NextApiResponse } from 'next';
import { Cart } from '../../../types/model/Cart';
import { fetchCartById } from '../../../services/cartService';
import { OrderRequest } from '../../../types/requests/OrderRequest';
import { CartDetail } from '../../../types/model/CartDetail';
import {
  deleteCartDetail,
  fetchCartDetailsByCartId,
} from '../../../services/cartDetailService';
import { createOrder } from '../../../services/orderService';
import { createOrderDetail } from '../../../services/orderDetailService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, cartId }: OrderRequest = req.body;

    if (!userId || !cartId)
      return res.status(404).json({ message: 'パラメータに異常があります。' });

    const cart: Cart | null = await fetchCartById(cartId);
    if (!cart)
      return res.status(404).json({ message: 'カートが存在していません。' });
    if (cart.userId !== userId)
      return res
        .status(404)
        .json({ message: 'あなたのカートではありません。' });

    const cartDetails: CartDetail[] = await fetchCartDetailsByCartId(cartId);
    if (cartDetails.length === 0)
      return res
        .status(404)
        .json({ message: 'カートに商品が追加されていません。' });

    const order = await createOrder({
      userId: cart.userId,
      shopId: cart.shopId,
    });
    for (const cartDetail of cartDetails) {
      const { productId, quantity, riceId } = cartDetail;
      await createOrderDetail({
        orderId: order.id,
        productId,
        riceId,
        quantity,
      });
      await deleteCartDetail({ id: cartDetail.id });
    }
    res.status(200).json({ message: '注文を確定しました。' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
