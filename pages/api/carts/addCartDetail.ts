import type { NextApiRequest, NextApiResponse } from 'next';
import { AddCartDetailRequest } from '../../../types/requests/AddCartDetailRequest';
import { CartDetail } from '../../../types/model/CartDetail';
import {
  createCartDetail,
  fetchCartDetail,
  updateCartDetail,
} from '../../../services/cartDetailService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { cartId, productId, riceId, quantity }: AddCartDetailRequest =
      req.body;

    if (!cartId || !productId || !riceId || quantity === 0)
      return res.status(404).json({ message: 'パラメータに異常があります。' });

    const cartDetail: CartDetail | null = await fetchCartDetail({
      cartId,
      productId,
      riceId,
    });

    if (cartDetail) {
      await updateCartDetail({
        id: cartDetail.id,
        quantity: cartDetail.quantity + quantity,
      });
    } else {
      await createCartDetail(req.body);
    }

    res.status(200).json({ message: 'カートに追加しました。' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
