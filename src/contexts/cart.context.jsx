import { createContext, useState, useEffect } from 'react';

// Checks if an item has already been added to the cart
function checkIfItemExists(itemToCheck, cartItems) {
  return cartItems.find((cartItem) => cartItem.id === itemToCheck.id);
}

function addCartItem(itemToAdd, cartItems) {
  const itemExists = checkIfItemExists(itemToAdd, cartItems);

  // If the item exisis - increment the quantity and adjust the priceByQuantity accordingly
  if (itemExists) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1, priceByQuantity: cartItem.price * (cartItem.quantity + 1) }
        : cartItem
    );
  }

  // If the item does not exist - add the item and append a quantity of one and a priceByQuantity equal to the price of a single item
  return [...cartItems, { ...itemToAdd, quantity: 1, priceByQuantity: itemToAdd.price }];
}

function removeCartItem(itemToRemove, cartItems) {
  const itemExists = checkIfItemExists(itemToRemove, cartItems);

  // Remove item if quantity < 1
  if (itemExists.quantity === 1) {
    return cartItems.filter((item) => !(item.id === itemToRemove.id));
  }

  // Decrement item quantity if item quantity > 1 and adjust priceByQuantity accordingly
  return cartItems.map((cartItem) =>
    cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1, priceByQuantity: cartItem.price * (cartItem.quantity - 1) }
      : cartItem
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

export function CartProvider({ children }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);

  // Update the number of items in the cart whenever an item is added to the cart
  // The total is displayed in the cart icon
  useEffect(() => {
    const newCartCount = cartItems.reduce((totalCount, item) => totalCount + item.quantity, 0);

    setCartCount(newCartCount);
  }, [cartItems]);

  // Update the total price for all that have been added to the cart
  // The total is displayed in the cart dropdown and checkout page
  useEffect(() => {
    const totalCartPrice = cartItems.reduce((totalPrice, item) => totalPrice + item.priceByQuantity, 0);

    setCartTotalPrice(totalCartPrice);
  }, [cartItems]);

  function addItemToCart(itemToAdd) {
    setCartItems(addCartItem(itemToAdd, cartItems));
  }

  function removeItemFromCart(itemToRemove) {
    setCartItems(removeCartItem(itemToRemove, cartItems));
  }

  function clearItemFromCart(itemToClear) {
    setCartItems(clearCartItem(itemToClear, cartItems));
  }

  function toggleCartDropdown() {
    return setIsCartOpen(!isCartOpen);
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
