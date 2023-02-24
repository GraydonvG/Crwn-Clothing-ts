import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/Navigation/Navigation.route';
import Home from './routes/home/Home.route';

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
      </Route>
    </Routes>
  );
}

export default App;
