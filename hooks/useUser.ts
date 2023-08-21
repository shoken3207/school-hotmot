import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BaseApiResponse } from '../types/response/BaseApiResponse';
import { UserRegisterRequest } from '../types/requests/UserRegisterRequest';
import { BaseHooksResponse } from '../types/hooks/BaseHooksResponse';
import { setInfo } from '../features/snackbarInfo/snackbarInfoSlice';
import { show } from '../features/snackbarIsShow/snackbarIsShowSlice';
import { UserResponse } from '../types/response/UserResponse';
import { UpdateProfileRequest } from '../types/requests/UpdateProfileRequest';

const useUserFunc = () => {
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const dispatch = useDispatch();

  const registerUser = async (
    args: UserRegisterRequest
  ): Promise<
    BaseHooksResponse & { registered?: boolean; user?: UserResponse }
  > => {
    try {
      const {
        message,
        registered,
        user,
      }: BaseApiResponse & { registered: boolean; user: UserResponse } =
        await axios
          .post(`${BASE_API_URL}/users/registerUser`, args)
          .then((res) => res.data);
      if (!!message) {
        dispatch(setInfo({ text: message, severity: 'warning' }));
        dispatch(show());
      }
      return { success: true, user, registered };
    } catch (err) {
      const { response } = err as { response: any };
      dispatch(setInfo({ text: response.data.message, severity: 'warning' }));
      dispatch(show());
      return { success: false };
    }
  };

  const updateUser = async (
    args: UpdateProfileRequest
  ): Promise<BaseHooksResponse> => {
    try {
      const { message }: BaseApiResponse = await axios.post(
        `${BASE_API_URL}/users/updateProfile`,
        args
      );
      if (!!message) {
        dispatch(setInfo({ text: message, severity: 'warning' }));
        dispatch(show());
      }
      return { success: true };
    } catch (err) {
      const { response } = err as { response: any };
      dispatch(setInfo({ text: response.data.message, severity: 'warning' }));
      dispatch(show());
      return { success: false };
    }
  };

  return { registerUser, updateUser };
};

export default useUserFunc;
