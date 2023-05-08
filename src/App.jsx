import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserDidUpdateProfile } from './store/user/user.selector';
import { setCurrentUser } from './store/user/user.slice';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utility';

import Navigation from './routes/navigation-bar/navigation-bar.route';
import Home from './routes/home/home.route';
import Authentication from './routes/authentication/authentication.route';
import Shop from './routes/shop/shop.route';
import Checkout from './routes/checkout/checkout.route';
import AddressAndPaymentForm from './routes/address-and-payment-form/address-and-payment-form.route';
import SuccessfulPayment from './routes/successful-payment/successful-payment.route';

function App() {
  const dispatch = useDispatch();
  const userDidUpdateProfile = useSelector(selectUserDidUpdateProfile);

  useEffect(() => {
    console.log('auth change');
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // create user doc if user signs in with google
        createUserDocumentFromAuth(user);
      }
      const selectedUserDetails = user && (({ displayName, email }) => ({ displayName, email }))(user);
      console.log('setCurrentUser in App.jsx');
      dispatch(setCurrentUser(selectedUserDetails));
    });
    console.log('unsub');
    return unsubscribe;
  }, [userDidUpdateProfile, dispatch]);

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
        <Route
          path="payment"
          element={<AddressAndPaymentForm />}
        />
        <Route
          path="payment-successful"
          element={<SuccessfulPayment />}
        />
      </Route>
    </Routes>
  );
}

export default App;
