import { BookMarkResponse } from '../../response/BookMarkResponse';
import { CartResponse } from '../../response/CartResponse';
import { OrderHistoryResponse } from '../../response/OrderHistoryResponse';

export type InitialType = {
  id: number | undefined;
  email: string | undefined;
  name: string | undefined;
  bookMarks: BookMarkResponse[];
  orderHistories: OrderHistoryResponse[];
  cart: CartResponse | undefined;
  createdAt: Date | undefined;
};
