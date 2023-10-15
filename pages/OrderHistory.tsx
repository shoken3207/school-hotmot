import React, { useEffect, useState } from 'react';
import { UserResponse } from '../types/response/UserResponse';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { OrderHistoryResponse } from '../types/response/OrderHistoryResponse';
import OrderHistoryBox from '../components/OrderHistoryBox';
import { styled } from 'styled-components';

const OrderHistory = () => {
  const user = useSelector((state: RootState) => state.userData);
  const [orderHistories, setOrderHistories] = useState<OrderHistoryResponse[]>(
    []
  );

  useEffect(() => {
    setOrderHistories(user.orderHistories);
    console.log(user.orderHistories);
  }, []);
  return (
    <SOrderHistory>
      {orderHistories.map((orderHistory: OrderHistoryResponse) => (
        <OrderHistoryBox key={orderHistory.id} orderHistory={orderHistory} />
      ))}
    </SOrderHistory>
  );
};

export default OrderHistory;

const SOrderHistory = styled.div`
  width: 90%;
  margin: 1rem auto;
  max-width: 560px;
`;
