import type { NextApiRequest, NextApiResponse } from 'next';
import { createOrderHistoriesResponse } from '../../../utils/createResponse';
import { FetchOrderHistoriesRequest } from '../../../types/requests/FetchOrderHistoriesRequest';
import { fetchOrdersByUserId } from '../../../services/orderService';
import { Order } from '../../../types/model/Order';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query as FetchOrderHistoriesRequest;

    if (!userId)
      return res.status(404).json({ message: 'パラメータに異常があります。' });

    const parseUserId = parseInt(userId);
    const orders: Order[] = await fetchOrdersByUserId(parseUserId);
    if (orders.length === 0)
      return res.status(404).json({ message: '注文されていません。' });
    const orderHistories = await createOrderHistoriesResponse(orders);

    res.status(200).json({ orderHistories, message: '' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
