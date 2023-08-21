import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import Layout from '../layouts/Layout';
import { useEffect } from 'react';
import { UserResponse } from '../types/response/UserResponse';
import { login } from '../features/userData/userDataSlice';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const user = sessionStorage.getItem('user');
    if (!!user) {
      const parseUser: UserResponse = JSON.parse(user);
      store.dispatch(login(parseUser));
    }
  }, []);
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;
