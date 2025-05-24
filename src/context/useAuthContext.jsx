import { createContext, useContext, useState } from "react";
const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [userId, setUserId] = useState(null);

  return (
    <AuthContext.Provider value={{ userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthUser() {
  const context = useContext(AuthContext);
  return context;
}
