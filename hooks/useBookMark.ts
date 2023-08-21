import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BaseApiResponse } from '../types/response/BaseApiResponse';
import { BaseHooksResponse } from '../types/hooks/BaseHooksResponse';
import { setInfo } from '../features/snackbarInfo/snackbarInfoSlice';
import { show } from '../features/snackbarIsShow/snackbarIsShowSlice';
import { AddBookMarkRequest } from '../types/requests/AddBookMarkRequest';
import { DeleteBookMarkRequest } from '../types/requests/DeleteBookMarkRequest';

const useBookMark = () => {
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const dispatch = useDispatch();

  const addBookMark = async (
    args: AddBookMarkRequest
  ): Promise<BaseHooksResponse> => {
    try {
      const { message }: BaseApiResponse = await axios
        .post(`${BASE_API_URL}/bookMarks/addBookMark`, args)
        .then((res) => res.data);
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

  const deleteBookMark = async (
    args: DeleteBookMarkRequest
  ): Promise<BaseHooksResponse> => {
    try {
      const { message }: BaseApiResponse = await axios.post(
        `${BASE_API_URL}/bookMarks/deleteBookMark`,
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

  return { addBookMark, deleteBookMark };
};

export default useBookMark;
