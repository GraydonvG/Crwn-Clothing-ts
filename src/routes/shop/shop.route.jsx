import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import CategoriesPreview from '../categories-preview/categories-preview.route';
import Category from '../category/category.route';

import { fetchCategoriesAsync } from '../../store/categories/categories.action';
import { selectCategoriesIsLoading } from '../../store/categories/categories.selector';

import Spinner from '../../components/spinner/spinner.component';

function Shop() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectCategoriesIsLoading);

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </Fragment>
  );
}

export default Shop;
