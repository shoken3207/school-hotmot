import { User } from '../types/model/User';
import { UserResponse } from '../types/response/UserResponse';
import { UsersResponse } from '../types/response/UsersResponse';
import { CartDetail } from '../types/model/CartDetail';
import { CartDetailResponse } from '../types/response/CartDetailResponse';
import { Cart } from '../types/model/Cart';
import { CartResponse } from '../types/response/CartResponse';
import { OrderDetailHistoryResponse } from '../types/response/OrderDetailHistoryResponse';
import { OrderHistoryResponse } from '../types/response/OrderHistoryResponse';
import { BookMark } from '../types/model/BookMark';
import { BookMarkResponse } from '../types/response/BookMarkResponse';
import { Order } from '../types/model/Order';
import { OrderDetail } from '../types/model/OrderDetail';
import AllergyData from '../jsons/Allergy.json';
import ProductData from '../jsons/Product.json';
import ProductAllergyData from '../jsons/ProductAllergy.json';
import ProductCategoryData from '../jsons/ProductCategory.json';
import RiceData from '../jsons/Rice.json';
import RiceGroupData from '../jsons/RiceGroup.json';
import RiceGroupDetailData from '../jsons/RiceGroupDetail.json';
import ShopData from '../jsons/Shop.json';
import { Product } from '../types/jsons/Product';
import { Rice } from '../types/jsons/Rice';
import { fetchOrderDetailsByOrderId } from '../services/orderDetailService';
import { fetchCartDetailsByCartId } from '../services/cartDetailService';
import { fetchBookMarksByUserId } from '../services/bookMarkService';
import { fetchOrdersByUserId } from '../services/orderService';
import { fetchCartByUserId } from '../services/cartService';

const createUserResponse = async (user: User): Promise<UserResponse> => {
  const { id, email, name, createdAt } = user;
  const bookMarks = await fetchBookMarksByUserId(id);
  const bookMarksResponse = await createBookMarksResponse(bookMarks);
  const orders = await fetchOrdersByUserId(id);
  const orderHistories = await createOrderHistoriesResponse(orders);
  const cart = await fetchCartByUserId(id);
  let cartResponse;
  if (cart) {
    cartResponse = await createCartResponse(cart);
  }

  const username = name || 'unknown';

  return {
    id,
    email,
    name: username,
    createdAt,
    bookMarks: bookMarksResponse,
    orderHistories,
    cart: cartResponse,
  };
};

const createUsersResponse = async (users: User[]): Promise<User[]> => {
  const usersResponse = await Promise.all(
    users.map(async (user) => {
      return user;
    })
  );
  return usersResponse;
};

const createCartDetailsResponse = async (
  cartDetails: CartDetail[]
): Promise<CartDetailResponse[]> => {
  const productData: Product[] = ProductData;
  const riceData: Rice[] = RiceData;
  const cartDetailsResponse: Array<CartDetailResponse | undefined> =
    cartDetails.map((cartDetail) => {
      const product: Product | undefined = productData.find(
        ({ id }) => id === cartDetail.productId
      );
      const rice: Rice | undefined = riceData.find(
        ({ id }) => id === cartDetail.riceId
      );
      if (product && rice) {
        const {
          id: productId,
          name: productName,
          listImage: productImage,
          price,
        } = product;
        const { name: riceName } = rice;
        const { quantity, createdAt, id } = cartDetail;
        return {
          id,
          productName,
          productId,
          productImage,
          price,
          riceName,
          quantity,
          createdAt,
        };
      }
    });
  const filterCartDetailsResponse: CartDetailResponse[] =
    cartDetailsResponse.filter((x) => x !== undefined) as CartDetailResponse[];

  return filterCartDetailsResponse;
};

const createCartResponse = async (cart: Cart): Promise<CartResponse> => {
  const { id, userId, shopId } = cart;
  const cartDetails = await fetchCartDetailsByCartId(id);
  const cartDetailsResponse = await createCartDetailsResponse(cartDetails);
  return { id, userId, shopId, details: cartDetailsResponse };
};

const createOrderDetailHistoriesResponse = async (
  orderDetails: OrderDetail[]
): Promise<OrderDetailHistoryResponse[]> => {
  const productData: Product[] = ProductData;
  const riceData: Rice[] = RiceData;
  const orderDetailHistories: Array<OrderDetailHistoryResponse | undefined> =
    orderDetails.map((orderDetail) => {
      const product: Product | undefined = productData.find(
        ({ id }) => id === orderDetail.productId
      );
      const rice: Rice | undefined = riceData.find(
        ({ id }) => id === orderDetail.riceId
      );
      if (product && rice) {
        const {
          id: productId,
          name: productName,
          listImage: productImage,
          price,
        } = product;
        const { name: riceName } = rice;
        const { quantity, createdAt, id } = orderDetail;
        return {
          id,
          productName,
          productId,
          productImage,
          price,
          riceName,
          quantity,
          createdAt,
        };
      }
    });
  const filterOrderDetailHistories: OrderDetailHistoryResponse[] =
    orderDetailHistories.filter(
      (x) => x !== undefined
    ) as OrderDetailHistoryResponse[];

  return filterOrderDetailHistories;
};

const createOrderHistoriesResponse = async (
  orders: Order[]
): Promise<OrderHistoryResponse[]> => {
  const orderHistories: OrderHistoryResponse[] = await Promise.all(
    orders.map(async (order) => {
      const { id, shopId, userId, createdAt } = order;
      const orderDetails: OrderDetail[] = await fetchOrderDetailsByOrderId(id);
      const orderDetailHistories: OrderDetailHistoryResponse[] =
        await createOrderDetailHistoriesResponse(orderDetails);

      return { id, shopId, userId, createdAt, details: orderDetailHistories };
    })
  );

  return orderHistories;
};

const createBookMarksResponse = async (
  bookMarks: BookMark[]
): Promise<BookMarkResponse[]> => {
  const productData: Product[] = ProductData;
  const riceData: Rice[] = RiceData;

  const bookMarksResponse: Array<BookMarkResponse | undefined> =
    await Promise.all(
      bookMarks.map(async (bookMark) => {
        const product = productData.find(({ id }) => id === bookMark.productId);
        const rice = riceData.find(({ id }) => id === bookMark.productId);
        if (product && rice) {
          const {
            name: productName,
            listImage: productImage,
            id: productId,
          } = product;
          const { name: riceName } = rice;
          const { id, userId, createdAt } = bookMark;
          return {
            id,
            userId,
            productId,
            productName,
            productImage,
            riceName,
            createdAt,
          };
        }
      })
    );

  const filterBookMarksResponse: BookMarkResponse[] = bookMarksResponse.filter(
    (x) => x !== undefined
  ) as BookMarkResponse[];

  return filterBookMarksResponse;
};

export {
  createUserResponse,
  createUsersResponse,
  createCartDetailsResponse,
  createCartResponse,
  createOrderDetailHistoriesResponse,
  createOrderHistoriesResponse,
  createBookMarksResponse,
};
