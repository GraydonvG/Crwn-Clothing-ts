import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Elements } from '@stripe/react-stripe-js';

import { store, persistor } from './store/store';

import { stripeOptions, stripePromise } from './utils/stripe/stripe.utility';

import App from './App';

import ScrollToTop from './helpers/scroll-to-top/scroll-to-top.helper';

import './main.scss';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <PersistGate
          loading={null}
          persistor={persistor}>
          <BrowserRouter>
            <ScrollToTop />
            <Elements
              stripe={stripePromise}
              options={stripeOptions}>
              <App />
            </Elements>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
} else {
  console.log('Root element not found');
}
