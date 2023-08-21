import { Allergy } from '../Allergy';
import { Rice } from '../Rice';

export type DetailProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  desc: string;
  allergys: Allergy[];
  rices: Rice[];
};
