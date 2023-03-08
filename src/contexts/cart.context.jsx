import { createContext, useState, useEffect } from 'react';

// Checks if an item has already been added to the cart
// If the item exisis - update the quantity
// If the item does not exist - add the item and append a quantity of one
function addCartItem(itemToAdd, cartItems) {
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
  cartCount: 0,
});

export function CartProvider({ children }) {
  const [isVisible, setIsVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  // Update the number of items in the cart whenever an item is added to the cart
  // The total is displayed in the cart icon
  useEffect(() => {
    const newCartCount = cartItems.reduce((totalCount, item) => totalCount + item.quantity, 0);

    setCartCount(newCartCount);
  }, [cartItems]);

  // Update the total price for all that have been added to the cart
  // The total is displayed in the cart dropdown
  useEffect(() => {
    const totalCartPrice = cartItems.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    setCartPrice(totalCartPrice);
  }, [cartItems]);

  function addItemToCart(itemToAdd) {
    setCartItems(addCartItem(itemToAdd, cartItems));
  }

  const value = { isVisible, setIsVisible, cartItems, addItemToCart, cartCount, cartPrice };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
