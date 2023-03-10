import { createContext, useState, useEffect } from 'react';

// Checks if an item has already been added to the cart
function checkIfItemExists(item, cartItems) {
  return cartItems.find((cartItem) => cartItem.id === item.id);
}

// If the item exisis - update the quantity
// If the item does not exist - add the item and append a quantity of one
function addCartItem(itemToAdd, cartItems) {
  const itemExists = checkIfItemExists(itemToAdd, cartItems);

  if (itemExists) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
  }
  return [...cartItems, { ...itemToAdd, quantity: 1 }];
}

function adjustCheckoutItemQuantity(itemToAdjust, cartItems, event) {
  const itemExists = checkIfItemExists(itemToAdjust, cartItems);

  if (itemExists) {
    switch (event.target.value) {
      case 'decrement':
        // Only decrement if cartItem and and itemToAdjust match, and cartItem quantity > 1
        return cartItems.map((cartItem) =>
          cartItem.id === itemToAdjust.id && cartItem.quantity > 1
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        break;
      case 'increment':
        return cartItems.map((cartItem) =>
          cartItem.id === itemToAdjust.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
        break;
      default:
        return cartItems;
        break;
    }
  }
}

function handleRemoveItem(itemToRemove, cartItems, event) {
  const itemExists = checkIfItemExists(itemToRemove, cartItems);

  if (itemExists && event.target.value === 'remove') {
    return cartItems.filter((item) => !(item.id === itemToRemove.id));
  }
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

  function addItemToCart(itemToAdd) {
    setCartItems(addCartItem(itemToAdd, cartItems));
  }

  function toggleCartDropdown() {
    return setIsVisible(!isVisible);
  }

  function setItemQuantity(itemToAdjust, event) {
    setCartItems(adjustCheckoutItemQuantity(itemToAdjust, cartItems, event));
  }

  function removeItem(itemToRemove, event) {
    setCartItems(handleRemoveItem(itemToRemove, cartItems, event));
  }

  const value = {
    isVisible,
    toggleCartDropdown,
    cartItems,
    addItemToCart,
    cartCount,
    cartPrice,
    setCartItems,
    setItemQuantity,
    removeItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
