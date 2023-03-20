import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

// Checks if an item has already been added to the cart
function checkIfItemExists(itemToCheck, cartItems) {
  return cartItems.find((cartItem) => cartItem.id === itemToCheck.id);
}

function addCartItem(itemToAdd, cartItems) {
  const itemExists = checkIfItemExists(itemToAdd, cartItems);

  // If the item exisis - increment the quantity
  if (itemExists) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }

  // If the item does not exist - add the item and append a quantity of one
  return [...cartItems, { ...itemToAdd, quantity: 1, priceByQuantity: itemToAdd.price }];
}

function removeCartItem(itemToRemove, cartItems) {
  const itemExists = checkIfItemExists(itemToRemove, cartItems);

  // Remove item if quantity < 1
  if (itemExists.quantity === 1) {
    return cartItems.filter((item) => !(item.id === itemToRemove.id));
  }

  // Decrement item quantity if item quantity > 1
  return cartItems.map((cartItem) =>
    cartItem.id === itemToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
  );
}

function clearCartItem(itemToClear, cartItems) {
  return cartItems.filter((item) => !(item.id === itemToClear.id));
}

export const CartContext = createContext({
  isCartOpen: false,
  toggleCartDropdown: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotalPrice: 0,
});

export const CART_ACTION_TYPES = {
  TOGGLE_CART_DROPDOWN: 'TOGGLE_CART_DROPDOWN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotalPrice: 0,
};

function cartReducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    default:
      throw new Error(`Unhandled type of ${type} in userReducer`);
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { isCartOpen, cartItems, cartCount, cartTotalPrice } = state;

  function updateCartItemReducer(newCartItems) {
    const newCartCount = newCartItems.reduce((totalCount, item) => totalCount + item.quantity, 0);

    const newTotalCartPrice = newCartItems.reduce((totalPrice, item) => totalPrice + item.priceByQuantity, 0);

    // Update the total item price according to the quantity
    newCartItems.map((item) => (item.priceByQuantity = item.price * item.quantity));

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotalPrice: newTotalCartPrice,
      })
    );
  }

  function toggleCartDropdown() {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN, null));
  }

  function addItemToCart(itemToAdd) {
    const newCartItems = addCartItem(itemToAdd, cartItems);
    updateCartItemReducer(newCartItems);
  }

  function removeItemFromCart(itemToRemove) {
    const newCartItems = removeCartItem(itemToRemove, cartItems);
    updateCartItemReducer(newCartItems);
  }

  function clearItemFromCart(itemToClear) {
    const newCartItems = clearCartItem(itemToClear, cartItems);
    updateCartItemReducer(newCartItems);
  }

  const value = {
    isCartOpen,
    toggleCartDropdown,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
