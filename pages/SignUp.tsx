import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Avatar, Button, TextField } from '@mui/material';
import { setInfo } from '../features/snackbarInfo/snackbarInfoSlice';
import { show } from '../features/snackbarIsShow/snackbarIsShowSlice';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { auth } from '../firebase/main';

const SignUp = () => {
  const [signUpInfo, setSignUpInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const signUp = (
    e:
      | React.FormEvent<HTMLFormElement>
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (
      signUpInfo.email === '' ||
      signUpInfo.password === '' ||
      signUpInfo.confirmPassword === ''
    ) {
      dispatch(
        setInfo({
          text: '入力されていない箇所があります。',
          severity: 'warning',
        })
      );
      dispatch(show());
      return;
    }

    if (signUpInfo.password !== signUpInfo.confirmPassword) {
      dispatch(
        setInfo({
          text: 'パスワードと確認用パスワードが異なります。',
          severity: 'warning',
        })
      );
      dispatch(show());
      return;
    }
    createUserWithEmailAndPassword(auth, signUpInfo.email, signUpInfo.password)
      .then(async (userCredential) => {
        router.push('/SignIn');
      })
      .catch((err) => {
        const errorMessage = err.message;
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
        <title>signUp</title>
      </Head>
      <SBox onSubmit={(e: React.FormEvent<HTMLFormElement>) => signUp(e)}>
        <div>
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <h3>Sign Up</h3>
        </div>
        <div>
          <TextField
            onChange={(e) =>
              setSignUpInfo({ ...signUpInfo, email: e.target.value })
            }
            fullWidth
            variant='standard'
            label='Email'
            required
            autoFocus
            autoComplete='email'
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                signUp(event);
              }
            }}
          />
          <TextField
            onChange={(e) =>
              setSignUpInfo({ ...signUpInfo, password: e.target.value })
            }
            fullWidth
            variant='standard'
            label='Password'
            required
            autoComplete='password'
            type='password'
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                signUp(event);
              }
            }}
          />
          <TextField
            onChange={(e) =>
              setSignUpInfo({ ...signUpInfo, confirmPassword: e.target.value })
            }
            fullWidth
            variant='standard'
            label='ConfirmPassword'
            autoComplete='password'
            type='password'
            required
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                signUp(event);
              }
            }}
          />
        </div>
        <SButtonGroup>
          <Button
            onClick={() => router.push('/SignIn')}
            variant='contained'
            color='secondary'
          >
            Sign In
          </Button>
          <Button
            onClick={(e) => signUp(e)}
            variant='contained'
            color='success'
          >
            Sign Up
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

export default SignUp;
