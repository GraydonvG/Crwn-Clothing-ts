import { createAction } from '../../utils/reducer/reducer.utility';

import CATEGORIES_ACTION_TYPES from './categories.types';

export function setCategories(categoriesArray) {
  return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);
}
