import React from 'react';
import '../src/app/globals.css';
import { store } from '@component/store/Store';
import { Provider } from 'react-redux';

const MyApp = ({ Component, pageProps }) => {
    console.log(pageProps,"paaaa")
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
