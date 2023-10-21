import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Avatar, Button, TextField } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { setInfo } from '../features/snackbarInfo/snackbarInfoSlice';
import { show } from '../features/snackbarIsShow/snackbarIsShowSlice';
import { login } from '../features/userData/userDataSlice';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/main';
import useUserFunc from '../hooks/useUser';
import useCart from '../hooks/useCart';
import { DEFAULT_SHOP_ID } from '../const';

const SignIn = () => {
  const [signInInfo, setSignInInfo] = useState({ email: '', password: '' });
  const { registerUser } = useUserFunc();
  const { addCart } = useCart();
  const dispatch = useDispatch();
  const router = useRouter();

  const signIn = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (signInInfo.email === '' || signInInfo.password === '') {
      dispatch(
        setInfo({
          text: '入力されていない箇所があります。',
          severity: 'warning',
        })
      );
      dispatch(show());
      return;
    }
    signInWithEmailAndPassword(auth, signInInfo.email, signInInfo.password)
      .then(async (userCredential) => {
        const userData = userCredential.user;
        const email: string = userData.email || '';
        const { success, user, registered } = await registerUser({
          email,
          isAdmin: false,
        });
        if (success && user) {
          await addCart({ shopId: DEFAULT_SHOP_ID, userId: user.id });
          sessionStorage.setItem('user', JSON.stringify(user));
          dispatch(login(user));

          if (registered) {
            router.push({ pathname: '/Home' });
          } else {
            router.push({ pathname: '/EditProfile' });
          }
        }
      })
      .catch((err) => {
        const errorMessage = err.message;
        console.log(errorMessage);
        dispatch(
          setInfo({
            text: errorMessage,
            severity: 'warning',
          })
        );
        dispatch(show());
      });
  };
  return (
    <SWrap>
      <Head>
        <title>signIn</title>
      </Head>
      <SBox onSubmit={(e: any) => signIn(e)}>
        <div>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOpenIcon />
          </Avatar>
          <h3>Sign In</h3>
        </div>
        <div>
          <TextField
            onChange={(e) =>
              setSignInInfo({ ...signInInfo, email: e.target.value })
            }
            fullWidth
            variant='standard'
            label='Email'
            required
            autoFocus
            autoComplete='email'
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                signIn(event);
              }
            }}
          />
          <TextField
            onChange={(e) =>
              setSignInInfo({ ...signInInfo, password: e.target.value })
            }
            fullWidth
            variant='standard'
            label='Password'
            required
            autoComplete='password'
            type='password'
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                signIn(event);
              }
            }}
          />
        </div>
        <SButtonGroup>
          <Button
            onClick={() => router.push('/SignUp')}
            variant='contained'
            color='secondary'
          >
            Sign Up
          </Button>
          <Button
            onClick={(e) => signIn(e)}
            variant='contained'
            color='success'
          >
            Sign In
          </Button>
        </SButtonGroup>
      </SBox>
    </SWrap>
  );
};

const SWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SBox = styled.form`
  max-width: 460px;
  width: 90%;
  padding: 1.8rem 2rem;
  display: flex;
  flex-direction: column;
  row-gap: 1.5rem;
  background-color: white;
  box-shadow: 8px 8px 19px -6px #777777;
  border-radius: 10px;

  > div {
    &:nth-of-type(1) {
      display: flex;
      align-items: center;
      flex-direction: column;
      row-gap: 0.2rem;

      > h3 {
        text-align: center;
        font-size: 1.5rem;
        font-weight: 450;
      }
    }
    &:nth-of-type(2) {
      display: flex;
      flex-direction: column;
      row-gap: 0.7rem;
    }
  }
`;

const SButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 1.5rem;
  align-items: center;
`;

export default SignIn;
