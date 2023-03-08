import { createContext, useState } from 'react';

function addCartItme(itemToAdd, cartItems) {
  const itemExists = cartItems.find((cartItem) => cartItem.id === itemToAdd.id);

  if (itemExists) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
}

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
    setCartItems(addCartItme(itemToAdd, cartItems));
  }
  const value = { isVisible, setIsVisible, cartItems, addItemToCart };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
