import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './store/store';

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
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </StrictMode>
  );
} else {
  console.log('Root element not found');
}
