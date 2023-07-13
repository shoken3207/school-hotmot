import { BookMark } from '../../model/BookMark';
import { OrderHistoryResponse } from '../../response/OrderHistoryResponse';

export type InitialType = {
  id: number | undefined;
  email: string;
  name: string;
  bookMarks: BookMark[];
  orderHistories: OrderHistoryResponse[];
  cart: undefined;
  createdAt: undefined;
};
