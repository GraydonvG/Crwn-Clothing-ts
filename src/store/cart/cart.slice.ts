import { createSlice } from '@reduxjs/toolkit';

export type CartItemType = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  priceByQuantity: number;
};

// Checks if an item has already been added to the cart
function checkIfItemExists(itemToCheck: CartItemType, cartItems: CartItemType[]) {
  return cartItems.find((cartItem) => cartItem.id === itemToCheck.id);
}

function addCartItem(itemToAdd: CartItemType, cartItems: CartItemType[]): CartItemType[] {
  const itemExists = checkIfItemExists(itemToAdd, cartItems);

  // If the item exisis - increment the quantity
  if (itemExists) {
    const incrementedCartItemQuantity = cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    // Adjust the items total price before updating state
    return adjustItemPriceByQuantity(incrementedCartItemQuantity);
  }

  // If the item does not exist - add the item and append a quantity of one
  // When quantity > 1, priceByQuantity = item.price * item.quantity
  return [...cartItems, { ...itemToAdd, quantity: 1, priceByQuantity: itemToAdd.price }];
}

function removeCartItem(itemToRemove: CartItemType, cartItems: CartItemType[]): CartItemType[] {
  const itemExists = checkIfItemExists(itemToRemove, cartItems);

  // Remove item from cart if quantity < 1
  if (itemExists && itemExists.quantity === 1) {
    return cartItems.filter((item) => !(item.id === itemToRemove.id));
  }

  // Decrement item quantity if item quantity > 1
  const decrementedCartItemQuantity = cartItems.map((cartItem) =>
    cartItem.id === itemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  );
  // Adjust the items total price before updating state
  return adjustItemPriceByQuantity(decrementedCartItemQuantity);
}

// Remove item from cart
function clearCartItem(itemToClear: CartItemType, cartItems: CartItemType[]) {
  return cartItems.filter((item) => !(item.id === itemToClear.id));
}

// Adjust the items total price when the items quantity changes
// This is the price displayed in the *****cart dropdown AND checkout page*****
function adjustItemPriceByQuantity(itemsArray: CartItemType[]): CartItemType[] {
  return itemsArray.map((item) => ({ ...item, priceByQuantity: item.price * item.quantity }));
}

type CartState = {
  isCartOpen: boolean;
  cartItems: CartItemType[];
};

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState: CART_INITIAL_STATE,
  reducers: {
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    addItemToCart(state, action) {
      state.cartItems = addCartItem(action.payload, state.cartItems);
    },
    removeItemFromCart(state, action) {
      state.cartItems = removeCartItem(action.payload, state.cartItems);
    },
    clearItemFromCart(state, action) {
      state.cartItems = clearCartItem(action.payload, state.cartItems);
    },
    clearAllItemsFromCart(state) {
      state.cartItems = [];
    },
  },
});

const { actions, reducer } = cartSlice;

export const { setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, clearAllItemsFromCart } = actions;

export const cartReducer = reducer;
