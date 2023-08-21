import React from 'react';
import { OrderHistoryResponse } from '../types/response/OrderHistoryResponse';
import { styled } from 'styled-components';
import OrderDetailHistoryBox from './OrderDetailHistoryBox';

const OrderHistoryBox = ({
  orderHistory,
}: {
  orderHistory: OrderHistoryResponse;
}) => {
  return (
    <SOrderHistoryBox>
      <SOrderHistoryDate>注文日時: 2023-08-16T23:31:11.905Z</SOrderHistoryDate>
      <SOrderHistoryBody>
        {orderHistory.details.map(
          ({
            productId,
            productImage,
            productName,
            price,
            quantity,
            riceName,
          }) => (
            <OrderDetailHistoryBox
              productId={productId}
              productImage={productImage}
              productName={productName}
              price={price}
              quantity={quantity}
              riceName={riceName}
            />
          )
        )}
      </SOrderHistoryBody>
    </SOrderHistoryBox>
  );
};

export default OrderHistoryBox;

const SOrderHistoryBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.6rem;
`;

const SOrderHistoryDate = styled.h2`
  border-bottom: 3px solid #ccc;
`;

const SOrderHistoryBody = styled.div`
  margin-left: 2rem;
`;
