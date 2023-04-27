import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utility';

// export function fetchCategoriesAsync() {
//   return async function (dispatch) {
//     dispatch(fetchCategoriesStart());

//     try {
//       const categoriesArray = await getCategoriesAndDocuments('categories');
//       dispatch(fetchCategoriesSuccess(categoriesArray));
//     } catch (error) {
//       dispatch(fetchCategoriesFailed(error));
//     }
//   };
// }

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  return await getCategoriesAndDocuments('categories');
});

export const CATEGORIES_INITIAL_STATE = {
  categories: [],
  isLoading: false,
  error: '',
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: CATEGORIES_INITIAL_STATE,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.pending, (state) => (state.isLoading = true));
    builder.addCase(fetchCategories.fulfilled, (state) => (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });
    builder.addCase(fetchCategories.rejected, (state) => (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

const { reducer } = categoriesSlice;

// export const { fetchCategories } = actions;

export const categoriesReducer = reducer;

// export function fetchCategoriesStart() {
//   return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
// }

// export function fetchCategoriesSuccess(categoriesArray) {
//   return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);
// }

// export function fetchCategoriesFailed(error) {
//   return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
// }
