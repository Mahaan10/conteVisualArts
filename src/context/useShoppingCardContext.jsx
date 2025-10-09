import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const ShoppingCardContext = createContext();

export default function ShoppingCardProvider({ children }) {
  const [cardItems, setCardItems] = useState(() => {
    const stored = localStorage.getItem("shoppingCard");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("shoppingCard", JSON.stringify(cardItems));
  }, [cardItems]);

  const addToCard = (course) => {
    let success = false;

    setCardItems((prev) => {
      const isExists = prev.find((item) => item._id === course._id);
      if (isExists) {
        toast.error("این دوره در سبد خرید شما وجود دارد");
        success = false;
        return prev;
      }
      success = true;
      return [...prev, course];
    });

    return success;
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
