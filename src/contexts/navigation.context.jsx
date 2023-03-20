import { createContext, useState } from 'react';

export const NavigationContext = createContext({
  previousPage: '',
  setPreviousPage: () => {},
});

export function NavigationProvider({ children }) {
  const [previousPage, setPreviousPage] = useState('');

  const value = { previousPage, setPreviousPage };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}
