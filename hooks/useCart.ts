import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BaseApiResponse } from '../types/response/BaseApiResponse';
import { BaseHooksResponse } from '../types/hooks/BaseHooksResponse';
import { setInfo } from '../features/snackbarInfo/snackbarInfoSlice';
import { show } from '../features/snackbarIsShow/snackbarIsShowSlice';
import { AddCartRequest } from '../types/requests/AddCartRequest';
import { AddCartDetailRequest } from '../types/requests/AddCartDetailRequest';
import { UpdateCartDetailRequest } from '../types/requests/UpdateCartDetailRequest';

const useCart = () => {
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const dispatch = useDispatch();

  const addCart = async (args: AddCartRequest): Promise<BaseHooksResponse> => {
    try {
      const { message }: BaseApiResponse = await axios
        .post(`${BASE_API_URL}/carts/addCart`, args)
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

  const addCartDetails = async (
    args: AddCartDetailRequest[]
  ): Promise<BaseHooksResponse> => {
    try {
      const { message }: BaseApiResponse = await axios
        .post(`${BASE_API_URL}/carts/addCartDetails`, args)
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

  const updateCartDetail = async (
    args: UpdateCartDetailRequest[]
  ): Promise<BaseHooksResponse> => {
    try {
      const { message }: BaseApiResponse = await axios
        .post(`${BASE_API_URL}/carts/updateCartDetail`, args)
        .then((res) => res.data);
      console.log('message: ', message);
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

  return { addCart, addCartDetails, updateCartDetail };
};

export default useCart;
