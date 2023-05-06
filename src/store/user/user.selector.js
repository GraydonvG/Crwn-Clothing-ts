export function selectCurrentUser(state) {
  return state.user.currentUser;
}

export function selectIsLoadingUser(state) {
  return state.user.isLoadingUser;
}
