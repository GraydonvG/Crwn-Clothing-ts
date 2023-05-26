import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { setCurrentUser } from './store/user/user.slice';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utility';

import Spinner from './components/spinner/spinner.component';

const NavigationBar = lazy(() => import('./routes/navigation-bar/navigation-bar.route'));
const Home = lazy(() => import('./routes/home/home.route'));
const Authentication = lazy(() => import('./routes/authentication/authentication.route'));
const Shop = lazy(() => import('./routes/shop/shop.route'));
const Checkout = lazy(() => import('./routes/checkout/checkout.route'));
const PaymentStatus = lazy(() => import('./routes/payment-status/payment-status.route'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        // create user doc if user signs in with google.
        // This creates a separate document for the user in the Firestore Database. This document can contain any key-value pair we choose to include.
        createUserDocumentFromAuth();
      }
      // The users displayName and email come from the user's auth instance and ***NOT*** the user document.
      const selectedUserDetails = user && (({ displayName, email }) => ({ displayName, email }))(user);
      dispatch(setCurrentUser(selectedUserDetails));
    });
    return unsubscribe;
  }, []);

  return (
    <Suspense fallback={<Spinner />}>
      <div>
        <Routes>
          <Route
            path="/"
            element={<NavigationBar />}>
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
              path="payment-status"
              element={<PaymentStatus />}
            />
          </Route>
        </Routes>
        <div style={{ height: '50px', backgroundColor: 'transparent' }}></div>
      </div>
    </Suspense>
  );
}

export default App;
