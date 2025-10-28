import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import useUser from "../hooks/useUser";
import useLogout from "../hooks/useLogout";

const GetUserContext = createContext();

export default function GetUserProvider({ children }) {
  const [token, setToken] = useState(null);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const { logout } = useLogout(setToken);

  useEffect(() => {
    const cookieToken = Cookies.get("token");

    if (!cookieToken) {
      setIsTokenChecked(true);
      return;
    }

    try {
      const base64Payload = cookieToken.split(".")[1];
      const payload = JSON.parse(atob(base64Payload));
      const now = Math.floor(Date.now() / 1000);

      if (payload.exp && payload.exp < now) {
        logout();
        setToken(null);
      } else {
        setToken(cookieToken);
      }
    } catch (err) {
      console.error("Invalid token", err);
      logout();
      setToken(null);
    }

    setIsTokenChecked(true);
  }, [logout]);

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
