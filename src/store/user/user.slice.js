import { createSlice } from '@reduxjs/toolkit';

const USER_INITIAL_STATE = {
  isLoadingUser: false,
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setIsLoadingUser(state, action) {
      state.isLoadingUser = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const { setCurrentUser, setIsLoadingUser } = actions;

export const userReducer = reducer;
