import type { NextApiRequest, NextApiResponse } from 'next';
import { createUser, fetchUserByEmail } from '../../../services/userService';
import { User } from '../../../types/model/User';
import { UserRegisterRequest } from '../../../types/requests/UserRegisterRequest';
import { createUserResponse } from '../../../utils/createResponse';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email }: UserRegisterRequest = req.body;

    if (!email)
      return res.status(404).json({ message: 'パラメータに異常があります。' });

    const user: User | null = await fetchUserByEmail(email);
    if (user) {
      const userResponse = await createUserResponse(user);
      return res
        .status(200)
        .json({ user: userResponse, registered: true, message: '' });
    }
    await createUser(req.body);
    const newUser = await fetchUserByEmail(email);
    if (!newUser) return res.status(404).json({ message: '失敗しました。' });
    const newUserResponse = await createUserResponse(newUser);
    res
      .status(200)
      .json({ user: newUserResponse, registered: false, message: '' });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
