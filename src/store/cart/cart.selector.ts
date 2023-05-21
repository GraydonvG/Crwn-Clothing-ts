import { createSelector } from '@reduxjs/toolkit';

import { type RootState } from '../store';

function selectCartReducer(state: RootState) {
  return state.cart;
}

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => cart.isCartOpen);

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((totalCount, item) => totalCount + item.quantity, 0)
);

export const selectTotalCartPrice = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((totalPrice, item) => totalPrice + item.priceByQuantity, 0)
);
