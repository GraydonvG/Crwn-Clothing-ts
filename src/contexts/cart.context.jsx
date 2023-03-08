import { createContext, useState } from 'react';

function addCartItem(itemToAdd, cartItems) {
  const itemExists = cartItems.find((cartItem) => cartItem.id === itemToAdd.id);

  if (itemExists) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
}

// function calculateNumberOfItemsInCart(cartItems, numberOfCartItems) {
//   return cartItems.reduce((count, cartItem) => {
//     return count + cartItem.quantity;
//   }, numberOfCartItems);
// }

export const CartContext = createContext({
  isVisible: false,
  setIsVisible: () => {},
  cartItems: [],
  addItemToCart: () => {},
});

export function CartProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  function addItemToCart(itemToAdd) {
    setCartItems(addCartItem(itemToAdd, cartItems));
  }

  const value = { isVisible, setIsVisible, cartItems, addItemToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
