import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utility';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  try {
    const categoriesArray = await getCategoriesAndDocuments();
    return categoriesArray;
  } catch (error) {
    console.log('Error fetching categories.', error);
    return [] as CategoryType[];
  }
});

export type CategoryItemType = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

export type CategoryType = {
  title: string;
  items: CategoryItemType[];
};

export type CategoriesState = {
  readonly categories: CategoryType[];
  readonly isLoading: boolean;
};

export const CATEGORIES_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: CATEGORIES_INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

const { reducer } = categoriesSlice;

export const categoriesReducer = reducer;
