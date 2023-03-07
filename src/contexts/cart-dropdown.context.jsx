import { createContext, useState } from 'react';

export const CartDropdownContext = createContext({
  isVisible: false,
  setIsVisible: () => {},
});

export function CartDropdownProvider({ children }) {
  const [isVisible, setIsVisible] = useState();
  const value = { isVisible, setIsVisible };

  return <CartDropdownContext.Provider value={value}>{children}</CartDropdownContext.Provider>;
}
