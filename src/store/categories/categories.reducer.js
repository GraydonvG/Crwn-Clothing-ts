import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utility';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  console.log('start');
  const categoriesArray = await getCategoriesAndDocuments('categories');
  console.log('array', categoriesArray);
  return categoriesArray;
});

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  // error: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: CATEGORIES_INITIAL_STATE,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories.push(action.payload);
    });
    builder.addCase(fetchCategories.rejected, (state) => {
      state.isLoading = false;
      // state.error = action.payload;
    });
  },
});

const { reducer } = categoriesSlice;

// export const { fetchCategories } = actions;

export const categoriesReducer = reducer;
