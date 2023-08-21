import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BaseApiResponse } from '../types/response/BaseApiResponse';
import { setInfo } from '../features/snackbarInfo/snackbarInfoSlice';
import { show } from '../features/snackbarIsShow/snackbarIsShowSlice';
import { UserResponse } from '../types/response/UserResponse';
import { FetchUserByIdRequest } from '../types/requests/FetchUserByIdRequest';
import { FetchUserByEmailRequest } from '../types/requests/FetchUserByEmailRequest';
import { FetchBookMarksRequest } from '../types/requests/FetchBookMarksRequest';
import { BookMarkResponse } from '../types/response/BookMarkResponse';
import { CartResponse } from '../types/response/CartResponse';
import { FetchCartRequest } from '../types/requests/FetchCartRequest';

const useFetchData = () => {
  const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const dispatch = useDispatch();

  const fetchUserById = async (
    args: FetchUserByIdRequest | { id: number }
  ): Promise<UserResponse | null> => {
    const { id } = args;
    try {
      const { user, message }: BaseApiResponse & { user: UserResponse } =
        await axios
          .get(`${BASE_API_URL}/users/fetchUserById?id=${id}`)
          .then((res) => res.data);
      if (!!message) {
        dispatch(setInfo({ text: message, severity: 'warning' }));
        dispatch(show());
      }
      return user;
    } catch (err) {
      const { response } = err as {
        response: any;
      };
      const data: BaseApiResponse = response.data;
      const { message } = data;
      dispatch(setInfo({ text: message, severity: 'warning' }));
      dispatch(show());
      return null;
    }
  };

  const fetchUserByEmail = async (
    args: FetchUserByEmailRequest
  ): Promise<UserResponse | null> => {
    const { email } = args;
    try {
      const { user, message }: BaseApiResponse & { user: UserResponse } =
        await axios
          .get(`${BASE_API_URL}/users/fetchUserByEmail?email=${email}`)
          .then((res) => res.data);
      if (!!message) {
        dispatch(setInfo({ text: message, severity: 'warning' }));
        dispatch(show());
      }
      return user;
    } catch (err) {
      const { response } = err as {
        response: any;
      };
      const data: BaseApiResponse = response.data;
      const { message } = data;
      dispatch(setInfo({ text: message, severity: 'warning' }));
      dispatch(show());
      return null;
    }
  };

  const fetchBookMarks = async (args: {
    userId: number | undefined;
    categoryId?: number;
  }): Promise<BookMarkResponse[]> => {
    const { userId, categoryId } = args;
    try {
      const {
        bookMarks,
        message,
      }: BaseApiResponse & { bookMarks: BookMarkResponse[] } = await axios
        .get(
          `${BASE_API_URL}/bookMarks/fetchBookMarks?userId=${userId}&categoryId=${categoryId}`
        )
        .then((res) => res.data);
      if (!!message) {
        dispatch(setInfo({ text: message, severity: 'warning' }));
        dispatch(show());
      }
      return bookMarks;
    } catch (err) {
      const { response } = err as {
        response: any;
      };
      const data: BaseApiResponse = response.data;
      const { message } = data;
      dispatch(setInfo({ text: message, severity: 'warning' }));
      dispatch(show());
      return [];
    }
  };

  const fetchCart = async (args: {
    userId: number | undefined;
    cartId: number | undefined;
  }): Promise<CartResponse | undefined> => {
    const { userId, cartId } = args;
    try {
      const { cart, message }: BaseApiResponse & { cart: CartResponse } =
        await axios
          .get(
            `${BASE_API_URL}/carts/fetchCart?userId=${userId}&cartId=${cartId}`
          )
          .then((res) => res.data);
      console.log('aa: ', cart, message);
      if (!!message) {
        dispatch(setInfo({ text: message, severity: 'warning' }));
        dispatch(show());
      }
      return cart;
    } catch (err) {
      const { response } = err as {
        response: any;
      };
      const data: BaseApiResponse = response.data;
      console.log('data: ', data);
      const { message } = data;
      dispatch(setInfo({ text: message, severity: 'warning' }));
      dispatch(show());
      return undefined;
    }
  };
  return { fetchUserById, fetchUserByEmail, fetchBookMarks, fetchCart };
};

export default useFetchData;
