import type { NextApiRequest, NextApiResponse } from 'next';
import { FetchUserByEmailRequest } from '../../../types/requests/FetchUserByEmailRequest';
import { fetchUserByEmail } from '../../../services/userService';
import { User } from '../../../types/model/User';
import { createUserResponse } from '../../../utils/createResponse';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = req.query as FetchUserByEmailRequest;

    if (email === '')
      return res.status(404).json({ message: 'パラメータに異常があります。' });
    const user: User | null = await fetchUserByEmail(email);
    if (!user)
      return res.status(404).json({ message: 'ユーザーが見つかりません。' });
    const responseUser = await createUserResponse(user);
    res.status(200).json({ user: responseUser, message: '' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
