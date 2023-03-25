import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { CartProvider } from './contexts/cart.context';
import { NavigationProvider, ScrollToTop } from './contexts/navigation.context';

import { store } from './store/store';

import App from './App';

import './main.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <CartProvider>
          <NavigationProvider>
            <App />
          </NavigationProvider>
        </CartProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
