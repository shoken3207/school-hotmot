import React, { Dispatch, SetStateAction } from 'react';
import { styled } from 'styled-components';
import { UpdateCartDetailRequest } from '../types/requests/UpdateCartDetailRequest';
import { CartDetailResponse } from '../types/response/CartDetailResponse';
import { useRouter } from 'next/router';

const CartDetailBox = ({
  id,
  price,
  productId,
  productImage,
  productName,
  quantity,
  riceName,
  updateCartDetails,
  setUpdateCartDetails,
  cartDetails,
  setCartDetails,
}: {
  id: number;
  price: number;
  productId: number;
  productImage: string;
  productName: string;
  quantity: number;
  riceName: string;
  updateCartDetails: UpdateCartDetailRequest[];
  setUpdateCartDetails: Dispatch<SetStateAction<UpdateCartDetailRequest[]>>;
  cartDetails: CartDetailResponse[];
  setCartDetails: Dispatch<SetStateAction<CartDetailResponse[]>>;
}) => {
  const router = useRouter();
  const changeCount = ({ id, quantity }: { id: number; quantity: number }) => {
    const copyCartDetails = [...cartDetails];
    const addCountIndex = copyCartDetails.findIndex((x) => x.id === id);

    copyCartDetails[addCountIndex].quantity = quantity;
    setCartDetails(copyCartDetails);

    if (updateCartDetails.some((x) => x.cartDetailId === id)) {
      const copyUpdateCartDetails = [...updateCartDetails];
      const updateCountIndex = updateCartDetails.findIndex(
        (x) => x.cartDetailId === id
      );
      copyUpdateCartDetails[updateCountIndex].quantity = quantity;
      setUpdateCartDetails(copyUpdateCartDetails);
    } else {
      setUpdateCartDetails((prev) => [
        ...prev,
        { cartDetailId: id, quantity: cartDetails[addCountIndex].quantity },
      ]);
    }
  };

  const addCount = ({ id }: { id: number }) => {
    const copyCartDetails = cartDetails.map((x) => x);
    const addCountIndex = copyCartDetails.findIndex((x) => x.id === id);

    copyCartDetails[addCountIndex].quantity++;
    setCartDetails(copyCartDetails);

    if (updateCartDetails.some((x) => x.cartDetailId === id)) {
      const copyUpdateCartDetails = [...updateCartDetails];
      const updateCountIndex = updateCartDetails.findIndex(
        (x) => x.cartDetailId === id
      );
      copyUpdateCartDetails[updateCountIndex].quantity++;
      setUpdateCartDetails(copyUpdateCartDetails);
    } else {
      setUpdateCartDetails((prev) => [
        ...prev,
        { cartDetailId: id, quantity: cartDetails[addCountIndex].quantity },
      ]);
    }
  };
  const subCount = ({ id }: { id: number }) => {
    const copyCartDetails = [...cartDetails];
    const subCountIndex = copyCartDetails.findIndex((x) => x.id === id);
    copyCartDetails[subCountIndex].quantity--;
    setCartDetails(copyCartDetails);

    if (updateCartDetails.some((x) => x.cartDetailId === id)) {
      const copyUpdateCartDetails = [...updateCartDetails];
      const updateCountIndex = updateCartDetails.findIndex(
        (x) => x.cartDetailId === id
      );
      copyUpdateCartDetails[updateCountIndex].quantity--;
      setUpdateCartDetails(copyUpdateCartDetails);
    } else {
      setUpdateCartDetails((prev) => [
        ...prev,
        { cartDetailId: id, quantity: cartDetails[subCountIndex].quantity },
      ]);
    }
  };
  return (
    <SBox>
      <SImage onClick={() => router.push(`/ProductDetail/${productId}`)}>
        <img src={productImage} alt='' />
      </SImage>
      <SRight>
        <h2>{productName}</h2>
        <h3>{riceName}</h3>
        <h4>
          {price}円 (税抜 : {Math.ceil(price / 1.08)}円)
        </h4>
        <SAddCountEl addCount={quantity}>
          <button disabled={quantity <= 0} onClick={() => subCount({ id })}>
            －
          </button>
          <input
            type='text'
            value={quantity}
            onChange={(e) =>
              changeCount({ id, quantity: parseInt(e.target.value) })
            }
          />
          <button onClick={() => addCount({ id })}>＋</button>
        </SAddCountEl>
      </SRight>
    </SBox>
  );
};

export default CartDetailBox;

const SBox = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.4rem 0.3rem;
  border-bottom: 3px solid #ccc;
`;

const SImage = styled.div`
  width: 35%;
  cursor: pointer;

  > img {
    width: 100%;
    height: 100%;
  }
`;

const SRight = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  row-gap: 0.4rem;
`;

const SAddCountEl = styled.div<{
  addCount: number;
}>`
  display: flex;

  > input {
    width: 50px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    border: 1px solid #ccc;
  }

  > button {
    width: 50px;
    height: 30px;
    border: 2px solid #ed1c24;
    cursor: pointer;
    &:nth-of-type(1) {
      transition: all 0.2s;
      border: ${({ addCount }: { addCount: number }) =>
        addCount === 0 && '1px solid #ccc'};
      background-color: ${({ addCount }: { addCount: number }) =>
        addCount === 0 && 'white'};
      border-radius: 7px 0 0 7px;
    }
    &:nth-of-type(2) {
      border-radius: 0 7px 7px 0;
    }
  }
`;
