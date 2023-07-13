import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchUserById } from '../../../services/userService';
import { User } from '../../../types/model/User';
import { createUserResponse } from '../../../utils/createResponse';
import { FetchUserByIdRequest } from '../../../types/requests/FetchUserByIdRequest';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query as FetchUserByIdRequest;

    if (!id)
      return res.status(404).json({ message: 'パラメータに異常があります。' });
    const parseId = parseInt(id);
    const user: User | null = await fetchUserById(parseId);
    if (!user)
      return res.status(404).json({ message: 'ユーザーが見つかりません。' });
    const responseUser = await createUserResponse(user);
    res.status(200).json({ user: responseUser, message: '' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
