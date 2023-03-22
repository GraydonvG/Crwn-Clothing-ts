import { createContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const NavigationContext = createContext({
  previousPage: '',
  setPreviousPage: () => {},
});

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export function NavigationProvider({ children }) {
  const [previousPage, setPreviousPage] = useState('');

  const value = { previousPage, setPreviousPage };

  return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
}
