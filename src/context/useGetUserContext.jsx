import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import useUser from "../hooks/useUser";

const GetUserContext = createContext();

export default function GetUserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    const cookieToken = Cookies.get("token");
    if (cookieToken) {
      setToken(cookieToken);
    }
    setIsTokenChecked(true);
  }, []);

  const { user, isLoading, isError, error } = useUser(token);

  return (
    <GetUserContext.Provider
      value={{
        user,
        isLoading,
        isError,
        error,
        token,
        setToken,
        isTokenChecked,
      }}
    >
      {children}
    </GetUserContext.Provider>
  );
}

export function useGetUser() {
  const context = useContext(GetUserContext);
  return context;
}
