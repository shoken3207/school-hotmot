import type { NextApiRequest, NextApiResponse } from 'next';

import {
  deleteBookMark,
  fetchBookMarkById,
} from '../../../services/bookMarkService';
import { BookMark } from '../../../types/model/BookMark';
import { DeleteBookMarkRequest } from '../../../types/requests/DeleteBookMarkRequest';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId, id }: DeleteBookMarkRequest = req.body;

    if (!userId || !id)
      return res.status(404).json({ message: 'パラメータに異常があります。' });

    const bookMark: BookMark | null = await fetchBookMarkById(id);
    if (!bookMark)
      return res
        .status(404)
        .json({ message: 'お気に入りに登録されていません。' });

    if (bookMark.userId !== userId)
      return res
        .status(404)
        .json({ message: 'あなたがお気に入りにしたものだけ削除できます。' });

    await deleteBookMark({ id });
    res.status(200).json({ message: 'お気に入りから削除しました。' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
