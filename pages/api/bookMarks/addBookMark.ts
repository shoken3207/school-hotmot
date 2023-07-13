import type { NextApiRequest, NextApiResponse } from 'next';

import { AddBookMarkRequest } from '../../../types/requests/AddBookMarkRequest';
import {
  createBookMark,
  fetchBookMark,
} from '../../../services/bookMarkService';
import { BookMark } from '../../../types/model/BookMark';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, productId }: AddBookMarkRequest = req.body;

    if (!userId || !productId)
      return res.status(404).json({ message: 'パラメータに異常があります。' });

    const bookMark: BookMark | null = await fetchBookMark(req.body);
    if (bookMark)
      return res.status(404).json({ message: 'お気に入りに登録済みです。' });

    await createBookMark(req.body);
    res.status(200).json({ message: 'お気に入りに登録しました。' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
