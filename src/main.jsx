import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { CartProvider } from './contexts/cart.context';

import { store } from './store/store';

import App from './App';

import './main.scss';
import ScrollToTop from './helpers/scroll-to-top/scroll-to-top.helper';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CartProvider>
          <ScrollToTop />
          <App />
        </CartProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
