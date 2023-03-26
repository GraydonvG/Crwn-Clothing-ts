import { createAction } from '../../utils/reducer/reducer.utility';

import CART_ACTION_TYPES from './cart.types';

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

export function setIsCartOpen(boolean) {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
}

export function addItemToCart(itemToAdd, cartItems) {
  const newCartItems = addCartItem(itemToAdd, cartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export function removeItemFromCart(itemToRemove, cartItems) {
  const newCartItems = removeCartItem(itemToRemove, cartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export function clearItemFromCart(itemToClear, cartItems) {
  const newCartItems = clearCartItem(itemToClear, cartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}
