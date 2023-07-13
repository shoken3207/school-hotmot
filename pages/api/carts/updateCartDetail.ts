import type { NextApiRequest, NextApiResponse } from 'next';
import { CartDetail } from '../../../types/model/CartDetail';
import {
  deleteCartDetail,
  fetchCartDetailById,
  updateCartDetail,
} from '../../../services/cartDetailService';
import { UpdateCartDetailRequest } from '../../../types/requests/UpdateCartDetailRequest';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { cartDetailId, quantity }: UpdateCartDetailRequest = req.body;

    if (!cartDetailId || quantity < 0)
      return res.status(404).json({ message: 'パラメータに異常があります。' });

    const cartDetail: CartDetail | null = await fetchCartDetailById(
      cartDetailId
    );

    if (!cartDetail)
      return res.status(404).json({ message: 'カートに追加されていません。' });

    if (quantity === 0) {
      await deleteCartDetail({
        id: cartDetail.id,
      });
    } else {
      await updateCartDetail({ id: cartDetailId, quantity });
    }

    res.status(200).json({ message: 'カートを更新しました。' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
