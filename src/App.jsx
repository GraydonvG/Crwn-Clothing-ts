import { Routes, Route } from 'react-router-dom';

import Navigation from './routes/NavigationBar/NavigationBar.route';
import Home from './routes/Home/Home.route';
import Authentication from './routes/Authentication/Authentication.route';
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
          path="auth"
          element={<Authentication />}
        />
      </Route>
    </Routes>
  );
}

export default App;
