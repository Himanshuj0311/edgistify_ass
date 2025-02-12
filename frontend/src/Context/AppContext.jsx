import { createContext, useContext, useEffect, useState } from "react";

// Create Context
const AppContext = createContext();

// Create Provider Component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState(null);
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState(null);

  //   setting user data if present
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        products,
        setProducts,
        product,
        setProduct,
        cart,
        setCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using context easily
export const useAppContext = () => {
  return useContext(AppContext);
};
