import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CurrentUser = {
  displayName: string;
  email: string;
};

export type UserState = {
  readonly currentUser: CurrentUser | null;
};

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action: PayloadAction<CurrentUser>) {
      state.currentUser = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const { setCurrentUser } = actions;

export const userReducer = reducer;
