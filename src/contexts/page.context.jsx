import { createContext, useState } from 'react';

export const PageContext = createContext({
  previousPage: '',
  setPreviousPage: () => {},
});

export function PageProvider({ children }) {
  const [previousPage, setPreviousPage] = useState('');

  const value = { previousPage, setPreviousPage };

  return <PageContext.Provider value={value}>{children}</PageContext.Provider>;
}
