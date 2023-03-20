import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/navigation-bar/navigation-bar.route';
import Home from './routes/home/home.route';
import Authentication from './routes/authentication/authentication.route';
import Shop from './routes/shop/shop.route';
import Checkout from './routes/checkout/checkout.route';

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigation />}>
        <Route
          index={true}
          element={<Home />}
        />
        <Route
          path="shop/*"
          element={<Shop />}
        />
        <Route
          path="auth"
          element={<Authentication />}
        />
        <Route
          path="checkout"
          element={<Checkout />}
        />
      </Route>
    </Routes>
  );
}

export default App;
