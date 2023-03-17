import { createContext, useState } from 'react';

export const PathContext = createContext({
  previousPage: '',
  setPreviousPage: () => {},
});

export function PathProvider({ children }) {
  const [previousPage, setPreviousPage] = useState('');

  const value = { previousPage, setPreviousPage };

  return <PathContext.Provider value={value}>{children}</PathContext.Provider>;
}
