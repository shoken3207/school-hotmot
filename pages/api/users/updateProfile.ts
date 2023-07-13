import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchUserById, updateUser } from '../../../services/userService';
import { UpdateProfileRequest } from '../../../types/requests/UpdateProfileRequest';
import { User } from '../../../types/model/User';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, name }: UpdateProfileRequest = req.body;

    if (!id || name === '')
      return res.status(404).json({ message: 'パラメータに異常があります。' });

    const user: User | null = await fetchUserById(id);
    if (!user)
      return res.status(404).json({ message: 'ユーザーが存在しません。' });

    await updateUser(req.body);
    res.status(200).json({ message: 'プロフィールの更新が成功しました。' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
