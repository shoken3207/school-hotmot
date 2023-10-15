import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { CartDetailResponse } from '../types/response/CartDetailResponse';
import CartDetailBox from '../components/CartDetailBox';
import { styled } from 'styled-components';
import { UpdateCartDetailRequest } from '../types/requests/UpdateCartDetailRequest';
import { Button } from '@mui/material';
import useFetchData from '../hooks/useFetchData';
import { CartResponse } from '../types/response/CartResponse';
import useCart from '../hooks/useCart';
import useOrder from '../hooks/useOrder';
import { login } from '../features/userData/userDataSlice';
import { useRouter } from 'next/router';

const Cart = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();
  const { fetchCart, fetchUserById } = useFetchData();
  const { updateCartDetail } = useCart();
  const { order: orderFunc } = useOrder();

  const [updateCartDetails, setUpdateCartDetails] = useState<
    UpdateCartDetailRequest[]
  >([]);
  const [cartDetails, setCartDetails] = useState<CartDetailResponse[]>([]);
  useEffect(() => {
    if (user.id && user.cart?.id) {
      fetchCart({ userId: user.id, cartId: user.cart.id }).then(
        (res: CartResponse | undefined) => {
          if (!!res) {
            setCartDetails(res.details);
          }
        }
      );
    }
  }, []);

  const order = async () => {
    const { success } = await orderFunc({
      userId: user.id,
      cartId: user.cart?.id,
    });
    if (user.id && success) {
      const userData = await fetchUserById({ id: user.id });
      if (userData) {
        dispatch(login(userData));
        router.push('/Home');
      }
    }
  };
  return (
    <SContaner>
      <STitle>Cart</STitle>
      <Button onClick={() => updateCartDetail(updateCartDetails)}>
        カートを更新
      </Button>
      <Button onClick={() => order()}>注文を確定</Button>
      <SCartDetailList>
        {cartDetails.map(
          ({
            id,
            productId,
            productImage,
            productName,
            price,
            riceName,
            quantity,
          }) => (
            <CartDetailBox
              key={id}
              id={id}
              productId={productId}
              productImage={productImage}
              productName={productName}
              riceName={riceName}
              price={price}
              quantity={quantity}
              updateCartDetails={updateCartDetails}
              setUpdateCartDetails={setUpdateCartDetails}
              cartDetails={cartDetails}
              setCartDetails={setCartDetails}
            />
          )
        )}
      </SCartDetailList>
    </SContaner>
  );
};

export default Cart;

const SContaner = styled.div`
  width: 90%;
  margin: 1rem auto;
  max-width: 560px;
`;

const STitle = styled.h1`
  font-size: 2rem;
  font-weight: 550;
  text-align: start;
`;

const SCartDetailList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  /* height: 75vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  } */
`;
