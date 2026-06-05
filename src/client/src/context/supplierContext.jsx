import { createContext, useContext, useState } from 'react';

const SupplierContext = createContext();

const SupplierProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SupplierContext.Provider value={{ loading, setLoading, darkMode, setDarkMode }}>
      {children}
    </SupplierContext.Provider>
  );
};

const useSupplier = () => useContext(SupplierContext);

export { useSupplier, SupplierProvider };
