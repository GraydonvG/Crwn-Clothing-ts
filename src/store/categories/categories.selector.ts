import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { type CategoryItemType } from './categories.slice';

// Returns categories slice from the redux store
// state = entire redux state
function selectCategoryReducer(state: RootState) {
  return state.categories;
}

// Memoized selector
// Only runs if the categories object changes
// Returns categories array from the categories slice
export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

// Memoized selector
// Only runs if the categories array changes
// Returns object of categories
export const selectCategoriesMap = createSelector([selectCategories], (categories) =>
  categories.reduce((acc: { [key: string]: CategoryItemType[] }, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {})
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
