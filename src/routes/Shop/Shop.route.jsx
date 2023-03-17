import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../CategoriesPreview/CategoriesPreview.route';
import Category from '../Category/Category.route';

import './Shop.styles.scss';

function Shop() {
  return (
    <Routes>
      <Route
        index
        element={<CategoriesPreview />}
      />
      <Route
        path=":category"
        element={<Category />}
      />
    </Routes>
  );
}

export default Shop;
