import React from 'react';
import Avatar from '@mui/material/Avatar';
import styled from 'styled-components';

const ProfileBox = ({
  id,
  email,
  username,
  iconChar,
}: {
  id: number;
  email: string;
  username: string;
  iconChar: string;
}) => {
  console.log(iconChar);
  return (
    <SBox>
      <SContainer>
        <Avatar style={{ width: '70px', height: '70px' }}>{iconChar}</Avatar>

        <h3>名前: {username}</h3>
        <h4>Eメール: {email}</h4>
      </SContainer>
    </SBox>
  );
};

export default ProfileBox;

const SBox = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 2.5rem;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const SContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 1.5rem;
`;
