import { createContext, useState, useEffect } from 'react';

// Checks if an item has already been added to the cart
function checkIfItemExists(item, cartItems) {
  return cartItems.find((cartItem) => cartItem.id === item.id);
}

// If the item exisis - update the quantity
// If the item does not exist - add the item and append a quantity of one
function handleCartItem(itemToHandle, cartItems, event) {
  const itemExists = checkIfItemExists(itemToHandle, cartItems);
  const cartItemEventValue = event.target.value;

  if (itemExists) {
    switch (cartItemEventValue) {
      case 'decrement':
        if (itemToHandle.quantity === 1) {
          return removeItemHandler(itemToHandle, cartItems);
        } else {
          return cartItems.map((cartItem) =>
            cartItem.id === itemToHandle.id && cartItem.quantity > 0
              ? { ...cartItem, quantity: cartItem.quantity - 1 }
              : cartItem
          );
        }
      case 'remove':
        return removeItemHandler(itemToHandle, cartItems);
      default:
        return cartItems.map((cartItem) =>
          cartItem.id === itemToHandle.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
    }
  }
  return [...cartItems, { ...itemToHandle, quantity: 1 }];
}

function removeItemHandler(itemToRemove, cartItems) {
  return cartItems.filter((item) => !(item.id === itemToRemove.id));
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
  const [itemPrice, setItemPrice] = useState(0);

  useEffect(() => {
    // Update the number of items in the cart whenever an item is added to the cart
    // The total is displayed in the cart icon
    const newCartCount = cartItems.reduce((totalCount, item) => totalCount + item.quantity, 0);

    setCartCount(newCartCount);

    // Update the total price for all that have been added to the cart
    // The total is displayed in the cart dropdown
    const totalCartPrice = cartItems.reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0);

    setCartPrice(totalCartPrice);
  }, [cartItems]);

  function handleCartItems(itemToHandle) {
    setCartItems(handleCartItem(itemToHandle, cartItems, event));
  }

  function toggleCartDropdown() {
    return setIsVisible(!isVisible);
  }

  function calculateItemPrice(price, quantity) {
    return price * quantity;
  }

  const value = {
    isVisible,
    toggleCartDropdown,
    cartItems,
    handleCartItems,
    cartCount,
    cartPrice,
    setCartItems,
    calculateItemPrice,
    itemPrice,
    setItemPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
