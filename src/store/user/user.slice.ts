import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type CurrentUserType = {
  displayName: string | null;
  email: string | null;
} | null;

export type UserState = {
  readonly currentUser: CurrentUserType;
};

const USER_INITIAL_STATE: UserState = {
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: USER_INITIAL_STATE,
  reducers: {
    setCurrentUser(state, action: PayloadAction<CurrentUserType>) {
      state.currentUser = action.payload;
    },
  },
});

const { actions, reducer } = userSlice;

export const { setCurrentUser } = actions;

export const userReducer = reducer;
