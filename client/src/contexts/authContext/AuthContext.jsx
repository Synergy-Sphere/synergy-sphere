import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

function AuthContextProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("loggedInUser")) || null
  );

  function updateUser(data) {
    setLoggedInUser(data);
  }

  useEffect(() => {
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  if (loggedInUser) console.log("loggedIn user -->", loggedInUser);
  return (
    <AuthContext.Provider value={{ loggedInUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
