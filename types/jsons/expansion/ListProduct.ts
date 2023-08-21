import { Rice } from '../Rice';

export type ListProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  categoryId: number;
  rices: Rice[];
};
