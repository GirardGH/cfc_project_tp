import { Provider } from "react-redux";
import store from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Layout from "../src/app/layout";

let persistor = persistStore(store);

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;

// import React from 'react';
// import App, { Container } from 'next/app';
// import { Provider } from 'react-redux';
// import withRedux from 'next-redux-wrapper';
// import store from '../store';

// class MyApp extends App {
//   static async getInitialProps({ Component, ctx }) {
//     const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

//     return { pageProps };
//   }

//   render() {
//     const { Component, pageProps, store } = this.props;

//     return (
//       <Container>
//         <Provider store={store}>
//           <Component {...pageProps} />
//         </Provider>
//       </Container>
//     );
//   }
// }

// export default withRedux(store)(MyApp);
