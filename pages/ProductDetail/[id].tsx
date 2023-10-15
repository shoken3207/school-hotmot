import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { fetchDetailProduct } from '../../utils/master';
import { DetailProduct } from '../../types/jsons/expansion/DetailProduct';
import { styled } from 'styled-components';
import { AddCartDetailRequest } from '../../types/requests/AddCartDetailRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import useCart from '../../hooks/useCart';
import { login } from '../../features/userData/userDataSlice';
import useFetchData from '../../hooks/useFetchData';
import { RICE_TYPE } from '../../const';

const ProductDetail = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const user = useSelector((state: RootState) => state.userData);
  const dispatch = useDispatch();
  const [productData, setProductData] = useState<DetailProduct | undefined>(
    undefined
  );
  const { addCartDetails: addCartDetailsFunc } = useCart();
  const { fetchUserById } = useFetchData();
  const [addCartProducts, setAddCartProducts] = useState<
    AddCartDetailRequest[]
  >([]);
  const fetchQuantity = (riceId: number) => {
    const cartProduct = addCartProducts.find((x) => x.riceId === riceId);
    if (cartProduct) {
      return cartProduct.quantity;
    } else {
      return 0;
    }
  };

  const changeCount = ({
    riceId,
    quantity,
  }: {
    riceId: number;
    quantity: number;
  }) => {
    if (quantity === 0) {
      if (addCartProducts.some((x) => x.riceId === riceId)) {
        const copyAddCartProducts = [...addCartProducts];
        const filterAddCartProducts = copyAddCartProducts.filter(
          (x) => x.riceId !== riceId
        );
        setAddCartProducts(filterAddCartProducts);
      }
    } else if (quantity > 0) {
      if (addCartProducts.some((x) => x.riceId === riceId)) {
        const copyAddCartProducts = [...addCartProducts];
        const changeCountIndex = copyAddCartProducts.findIndex(
          (x) => x.riceId === riceId
        );
        copyAddCartProducts[changeCountIndex].quantity = quantity;
        setAddCartProducts(copyAddCartProducts);
      } else {
        setAddCartProducts((prev) => [
          ...prev,
          {
            cartId: user.cart?.id,
            productId: productData?.id,
            riceId,
            quantity,
          },
        ]);
      }
    }
  };
  const addCount = ({ riceId }: { riceId: number }) => {
    if (addCartProducts.some((x) => x.riceId === riceId)) {
      const copyAddCartProducts = [...addCartProducts];
      const addCountIndex = copyAddCartProducts.findIndex(
        (x) => x.riceId === riceId
      );
      copyAddCartProducts[addCountIndex].quantity++;
      setAddCartProducts(copyAddCartProducts);
    } else {
      setAddCartProducts((prev) => [
        ...prev,
        {
          cartId: user.cart?.id,
          productId: productData?.id,
          riceId,
          quantity: 1,
        },
      ]);
    }
  };
  const subCount = ({ riceId }: { riceId: number }) => {
    if (addCartProducts.some((x) => x.riceId === riceId)) {
      const copyAddCartProducts = [...addCartProducts];
      const subCountIndex = copyAddCartProducts.findIndex(
        (x) => x.riceId === riceId
      );
      if (addCartProducts[subCountIndex].quantity === 1) {
        const filterAddCartProducts = copyAddCartProducts.filter(
          (x) => x.riceId !== riceId
        );
        setAddCartProducts(filterAddCartProducts);
      } else if (addCartProducts[subCountIndex].quantity > 1) {
        copyAddCartProducts[subCountIndex].quantity--;
        setAddCartProducts(copyAddCartProducts);
      }
    }
  };

  const addCartDetails = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      addCartProducts.length <= 0 ||
      addCartProducts.some((x) => x.quantity <= 0)
    )
      return;
    if (user.cart && user.cart.id) {
      const { success } = await addCartDetailsFunc(addCartProducts);

      if (success && user.id) {
        setAddCartProducts([]);
        const userData = await fetchUserById({ id: user.id });
        if (userData) {
          dispatch(login(userData));
        }
      }
    }
  };

  useEffect(() => {
    const productDetail = fetchDetailProduct(parseInt(id));
    setProductData(productDetail);
  }, []);

  return (
    <SContainer>
      <SProductName>{productData?.name}</SProductName>
      <img src={productData?.image} alt='' />
      <h4>
        {productData?.desc &&
          productData?.desc.split('<br>').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
      </h4>
      {productData?.allergys && productData.allergys.length > 0 && (
        <SAllergyContaner>
          <span>アレルギー物質表示</span>
          {productData?.allergys.map(({ id, name }) => (
            <SAllergy key={id}>{name}</SAllergy>
          ))}
        </SAllergyContaner>
      )}
      {productData && productData?.rices.length > 0 ? (
        <SSelectContainer>
          {productData.rices.map(({ name, id }) => (
            <div key={id}>
              <div key={id}>{name}</div>
              <SAddCountEl addCount={fetchQuantity(id)}>
                <button
                  disabled={fetchQuantity(id) <= 0}
                  onClick={() => subCount({ riceId: id })}
                >
                  －
                </button>
                <input
                  type='text'
                  value={fetchQuantity(id)}
                  onChange={(e) =>
                    changeCount({
                      riceId: id,
                      quantity: parseInt(e.target.value),
                    })
                  }
                />
                <button onClick={() => addCount({ riceId: id })}>＋</button>
              </SAddCountEl>
            </div>
          ))}
        </SSelectContainer>
      ) : (
        <SAddCountEl addCount={fetchQuantity(RICE_TYPE.NONE)}>
          <button
            disabled={fetchQuantity(RICE_TYPE.NONE) <= 0}
            onClick={() => subCount({ riceId: RICE_TYPE.NONE })}
          >
            －
          </button>
          <input
            type='text'
            value={fetchQuantity(RICE_TYPE.NONE)}
            onChange={(e) =>
              changeCount({
                riceId: RICE_TYPE.NONE,
                quantity: parseInt(e.target.value),
              })
            }
          />
          <button onClick={() => addCount({ riceId: RICE_TYPE.NONE })}>
            ＋
          </button>
        </SAddCountEl>
      )}
      <SCartButton>
        <Button
          startIcon={<ShoppingCartIcon fontSize='large' />}
          onClick={(e) => addCartDetails(e)}
          variant='contained'
          color='error'
        >
          <span>
            カートに
            <br />
            入れる
          </span>
        </Button>
      </SCartButton>
    </SContainer>
  );
};

export default ProductDetail;

const SProductName = styled.h1`
  font-size: 2.4rem;
  padding-bottom: 0.7rem;
  border-bottom: 3px solid #ccc;
`;

const SContainer = styled.div`
  width: 85%;
  max-width: 1120px;
  margin: 0 auto;
  padding-top: 3rem;
`;

const SAllergyContaner = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  column-gap: 0.5rem;

  > span {
    font-size: 0.9rem;
    font-family: 'Noto Sans JP', sans-serif;
    font-weight: 550;
    color: #5b5a5a;
  }

  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    row-gap: 0.3rem;
  }
`;

const SAllergy = styled.div`
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
  min-width: 3rem;
  text-align: center;
  color: white;
  border-radius: 10px;
  font-weight: bold;
  font-family: 'Noto Sans JP', sans-serif;
  background-color: #999595;
`;

const SSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 0.5rem;
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

const SCartButton = styled.div`
  span {
    color: white;
    font-size: 0.7rem;
  }
`;
