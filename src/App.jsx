import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/NavigationBar/NavigationBar.route';
import Home from './routes/Home/Home.route';
import SignIn from './routes/SignIn/SignIn.route';
import Shop from './routes/Shop/Shop.route';

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
          path="shop"
          element={<Shop />}
        />
        <Route
          path="sign-in"
          element={<SignIn />}
        />
      </Route>
    </Routes>
  );
}

export default App;
