import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { type AppDispatch } from '../../store/store';

import { fetchCategories } from '../../store/categories/categories.slice';

import CategoriesPreview from '../categories-preview/categories-preview.route';
import Category from '../category/category.route';

function Shop() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
    </div>
  );
}

export default Shop;
