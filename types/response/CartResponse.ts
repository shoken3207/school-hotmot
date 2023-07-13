import { CartDetailResponse } from './CartDetailResponse';

export type CartResponse = {
  id: number;
  userId: number;
  shopId: number;
  details: CartDetailResponse[];
};
