import type { NextApiRequest, NextApiResponse } from 'next';
import { Cart } from '../../../types/model/Cart';
import { createCartResponse } from '../../../utils/createResponse';
import { FetchCartRequest } from '../../../types/requests/FetchCartRequest';
import { fetchCartById } from '../../../services/cartService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { cartId, userId } = req.query as FetchCartRequest;

    if (!cartId || !userId)
      return res.status(404).json({ message: 'パラメータに異常があります。' });
    const parseCartId = parseInt(cartId);
    const parseUserId = parseInt(userId);
    const cart: Cart | null = await fetchCartById(parseCartId);
    if (!cart)
      return res.status(404).json({ message: 'カートが見つかりません。' });
    if (cart.userId !== parseUserId)
      return res
        .status(404)
        .json({ message: 'あなたのカートではありません。' });

    const responseCart = await createCartResponse(cart);
    if (responseCart.details.length === 0)
      return res
        .status(404)
        .json({ message: 'カートに商品が追加されていません。' });

    res.status(200).json({ cart: responseCart, message: '' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
