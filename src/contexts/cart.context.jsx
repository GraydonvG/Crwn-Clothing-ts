import { createContext, useState, useEffect } from 'react';

// Checks if an item has already been added to the cart
function checkIfItemExists(itemToCheck, cartItems) {
  return cartItems.find((cartItem) => cartItem.id === itemToCheck.id);
}

// If the item exisis - increment the quantity and adjust the priceByQuantity accordingly
// If the item does not exist - add the item and append a quantity of one and a priceByQuantity equal to the price of a single item
function addCartItem(itemToAdd, cartItems) {
  const itemExists = checkIfItemExists(itemToAdd, cartItems);

  if (itemExists) {
    return cartItems.map((cartItem) =>
      cartItem.id === itemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1, priceByQuantity: cartItem.price * (cartItem.quantity + 1) }
        : cartItem
    );
  }

  return [...cartItems, { ...itemToAdd, quantity: 1, priceByQuantity: itemToAdd.price }];
}

// Decrement item quantity if item quantity > 1 and adjust priceByQuantity accordingly
// Remove item if quantity < 1 or if user selects remove button
function removeCartItem(itemToRemove, cartItems, event) {
  const itemExists = checkIfItemExists(itemToRemove, cartItems);

  if (itemExists.quantity === 1 || event.target.value === 'remove') {
    return cartItems.filter((item) => !(item.id === itemToRemove.id));
  }

  return cartItems.map((cartItem) =>
    cartItem.id === itemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1, priceByQuantity: cartItem.price * (cartItem.quantity - 1) }
      : cartItem
  );
}

export const CartContext = createContext({
  // isVisible: false,
  // setIsVisible: () => {},
  // cartItems: [],
  // handleCartItems: () => {},
  // cartCount: 0,
  // cartPrice: 0,
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

  function removeItemFromCart(itemToRemove, event) {
    setCartItems(removeCartItem(itemToRemove, cartItems, event));
  }

  function toggleCartDropdown() {
    return setIsVisible(!isVisible);
  }

  const value = {
    isVisible,
    toggleCartDropdown,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    cartCount,
    cartPrice,
    setCartItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
