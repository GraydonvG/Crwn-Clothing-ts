import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { setCategories } from '../../store/categories/categories.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utility';

import CategoriesPreview from '../categories-preview/categories-preview.route';
import Category from '../category/category.route';

function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getCategoriesMap() {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(setCategories(categoriesArray));
    }

    getCategoriesMap();
  }, [dispatch]);

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
