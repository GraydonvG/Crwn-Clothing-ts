export function selectCurrentUser(state) {
  return state.user.currentUser;
}

export function selectUserDidUpdateProfile(state) {
  return state.user.userDidUpdateProfile;
}
