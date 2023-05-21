import { createSelector } from '@reduxjs/toolkit';
import { type RootState } from '../store';

export function selectUserReducer(state: RootState['user']) {
  return state;
}

export const selectCurrentUser = createSelector([selectUserReducer], (userSlice) => userSlice.currentUser);
