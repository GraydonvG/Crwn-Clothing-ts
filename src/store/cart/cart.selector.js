import { createSelector } from 'reselect';

function selectCartReducer(state) {
  return state.cart;
}

export const selectIsCartOpen = createSelector([selectCartReducer], (cart) => cart.isCartOpen);

export const selectCartItems = createSelector([selectCartReducer], (cart) => cart.cartItems);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((totalCount, item) => totalCount + item.quantity, 0)
);

export const selectItemPriceByQuantity = createSelector([selectCartItems], (cartItems) =>
  cartItems.map((item) => (item.priceByQuantity = item.price * item.quantity))
);

export const selectTotalCartPrice = createSelector([selectCartItems, selectItemPriceByQuantity], (cartItems) =>
  cartItems.reduce((totalPrice, item) => totalPrice + item.priceByQuantity, 0)
);
