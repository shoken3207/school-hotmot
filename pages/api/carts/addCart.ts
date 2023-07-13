import type { NextApiRequest, NextApiResponse } from 'next';

import { Cart } from '../../../types/model/Cart';
import { AddCartRequest } from '../../../types/requests/AddCartRequest';
import { createCart, fetchCart } from '../../../services/cartService';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, shopId }: AddCartRequest = req.body;

    if (!userId || !shopId)
      return res.status(404).json({ message: 'パラメータに異常があります。' });

    const cart: Cart | null = await fetchCart(req.body);
    if (cart)
      return res.status(404).json({ message: 'カートがすでに存在します。' });

    await createCart(req.body);
    res.status(200).json({ message: '' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
