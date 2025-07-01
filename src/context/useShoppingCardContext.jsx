import { createContext, useContext, useState } from "react";

const ShoppingCardContext = createContext();

export default function ShoppingCardProvider({ children }) {
  const [cardItems, setCardItems] = useState([]);

  const addToCard = (course) => {
    setCardItems((prev) => {
      const isExists = prev.find((item) => item._id === course._id);
      if (isExists) return prev;
      return [...prev, course];
    });
  };

  const removeFromCard = (id) => {
    setCardItems((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCard = () => {
    setCardItems([]);
  };

  const totalPrice = cardItems.reduce(
    (sum, item) => sum + (item.price || 0),
    0
  );

  return (
    <ShoppingCardContext.Provider
      value={{ cardItems, addToCard, removeFromCard, clearCard, totalPrice }}
    >
      {children}
    </ShoppingCardContext.Provider>
  );
}

export function useCart() {
  const context = useContext(ShoppingCardContext);
  return context;
}
