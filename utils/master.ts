import { PRODUCT_CATEGORIES } from '../const';
import AllergyData from '../jsons/Allergy.json';
import ProductData from '../jsons/Product.json';
import ProductAllergyData from '../jsons/ProductAllergy.json';
import RiceData from '../jsons/Rice.json';
import RiceGroupDetailData from '../jsons/RiceGroupDetail.json';
import { Allergy } from '../types/jsons/Allergy';
import { Product } from '../types/jsons/Product';
import { ProductAllergy } from '../types/jsons/ProductAllergy';
import { Rice } from '../types/jsons/Rice';
import { RiceGroupDetail } from '../types/jsons/RiceGroupDetail';
import { DetailProduct } from '../types/jsons/expansion/DetailProduct';
import { ListProduct } from '../types/jsons/expansion/ListProduct';

const fetchProductsByCategory = (category: number): ListProduct[] => {
  const productData: Product[] = ProductData;
  const filterProducts =
    category === PRODUCT_CATEGORIES.ALL
      ? productData
      : productData.filter((x) => x.productCategoryId === category);
  const convertProducts = _convertListProducts(filterProducts);
  return convertProducts;
};

// 商品リスト変換
const _convertListProducts = (products: Product[]): ListProduct[] => {
  const convertProducts = products.map((product) => {
    const rices = _fetchConvertRices(product.riceGroupId);
    const { id, name, price, listImage, productCategoryId } = product;
    return {
      id,
      name,
      price,
      categoryId: productCategoryId,
      image: listImage,
      rices,
    };
  });
  return convertProducts;
};

const fetchDetailProduct = (productId: number): DetailProduct | undefined => {
  const productData: Product[] = ProductData;
  const product = productData.find((x) => x.id === productId);
  if (product) {
    const convertProduct = _convertDetailProduct(product);
    return convertProduct;
  }
};

// 商品詳細変換
const _convertDetailProduct = (product: Product) => {
  const rices = _fetchConvertRices(product.riceGroupId);
  const allergys = _fetchConvertAllergys(product.id);
  const { id, name, price, detailImage, desc } = product;
  return {
    id,
    name,
    price,
    image: detailImage,
    desc,
    rices,
    allergys,
  };
};

// ライス変換
const _fetchConvertRices = (riceGroupId: number): Rice[] => {
  const riceGroupDetailData: RiceGroupDetail[] = RiceGroupDetailData;
  const riceData: Rice[] = RiceData;
  const currentRiceGroupDetails = riceGroupDetailData.filter(
    (x) => x.riceGroupId === riceGroupId
  );
  const currentRices = currentRiceGroupDetails.map((x) => {
    const rice = riceData.find((y) => y.id === x.riceId);
    return rice;
  });
  const filterRices = currentRices.filter((x) => {
    return x !== undefined;
  }) as Rice[];
  return filterRices;
};

// Allergy変換
const _fetchConvertAllergys = (productId: number): Allergy[] => {
  const allergyData: Allergy[] = AllergyData;
  const productAllergyData: ProductAllergy[] = ProductAllergyData;

  const currentProductAllergys = productAllergyData.filter(
    (x) => x.productId === productId
  );

  const currentAllergys = currentProductAllergys.map((x) => {
    const allergy = allergyData.find((y) => y.id === x.allergyId);
    return allergy;
  });

  const filterAllergys = currentAllergys.filter(
    (x) => x !== undefined
  ) as Allergy[];

  return filterAllergys;
};

export { fetchProductsByCategory, fetchDetailProduct };
