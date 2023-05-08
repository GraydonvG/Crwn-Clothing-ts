import { createSlice } from '@reduxjs/toolkit';

const USER_INITIAL_STATE = {
  currentUser: null,
  userDidUpdateProfile: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    setUserDidUpdateProfile(state, action) {
      state.userDidUpdateProfile = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const { setCurrentUser, setUserDidUpdateProfile } = actions;

export const userReducer = reducer;
