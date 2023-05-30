import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { type CategoryItemType } from './categories.slice';

function selectCategoryReducer(state: RootState) {
  return state.categories;
}

export const selectCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.categories
);

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
