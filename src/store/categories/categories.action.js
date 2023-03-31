import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utility';
import { createAction } from '../../utils/reducer/reducer.utility';

import CATEGORIES_ACTION_TYPES from './categories.types';

export function setCategories(categoriesArray) {
  return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
}

export function fetchCategoriesStart() {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
}

export function fetchCategoriesSuccess(categoriesArray) {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);
}

export function fetchCategoriesFailed(error) {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
}

export function fetchCategoriesAsync() {
  return async function (dispatch) {
    dispatch(fetchCategoriesStart());

    try {
      const categoriesArray = await getCategoriesAndDocuments('categories');
      dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
      dispatch(fetchCategoriesFailed(error));
    }
  };
}
