import { BookMarkResponse } from './BookMarkResponse';
import { CartResponse } from './CartResponse';
import { OrderHistoryResponse } from './OrderHistoryResponse';

export type UserResponse = {
  id: number;
  email: string;
  name: string;
  bookMarks: BookMarkResponse[];
  orderHistories: OrderHistoryResponse[];
  cart: CartResponse | undefined;
  createdAt: Date;
};
