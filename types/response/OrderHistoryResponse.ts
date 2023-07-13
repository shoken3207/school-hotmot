import { OrderDetailHistoryResponse } from './OrderDetailHistoryResponse';

export type OrderHistoryResponse = {
  id: number;
  shopId: number;
  userId: number;
  createdAt: Date;
  details: OrderDetailHistoryResponse[];
};
