import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BaseApiResponse } from '../types/response/BaseApiResponse';
import { BaseHooksResponse } from '../types/hooks/BaseHooksResponse';
import { setInfo } from '../features/snackbarInfo/snackbarInfoSlice';
import { show } from '../features/snackbarIsShow/snackbarIsShowSlice';
import { OrderRequest } from '../types/requests/OrderRequest';

const useOrder = () => {
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const dispatch = useDispatch();

  const order = async (args: OrderRequest): Promise<BaseHooksResponse> => {
    try {
      const { message }: BaseApiResponse = await axios
        .post(`${BASE_API_URL}/orders/order`, args)
        .then((res) => res.data);
      if (!!message) {
        dispatch(setInfo({ text: message, severity: 'success' }));
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

  return { order };
};

export default useOrder;
